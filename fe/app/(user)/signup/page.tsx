"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useGoogleLogin } from "@react-oauth/google";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { Clipboard } from "lucide-react";

import AuthShell from "@/app/components/auth/AuthShell";
import AuthField from "@/app/components/auth/AuthField";
import PasswordField from "@/app/components/auth/PasswordField";
import AuthDivider from "@/app/components/auth/AuthDivider";
import OAuthButtons from "@/app/components/auth/OAuthButtons";

import { useToast } from "@/lib/toast/toastStore";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToast } = useToast.getState();

  const [showPassword, setShowPassword] = React.useState(false);
  const [oauthUsed, setOauthUsed] = React.useState(false);
  const [isPopupVisible, setIsPopupVisible] = React.useState(false);

  const [generatedPassword, setGeneratedPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      terms: false,
    },

    validationSchema: Yup.object({
      fullName: Yup.string().min(2).required("Full name is required"),
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().min(6).required("Password is required"),
      terms: Yup.boolean().oneOf([true], "You must accept terms"),
    }),

    onSubmit: async (values) => {
      setIsPopupVisible(true);

      const payload = oauthUsed
        ? {
            username,
            email,
            password: generatedPassword,
            profileImageUrl: "",
            bio: "",
            bannerUrl: "",
            sources: [],
          }
        : {
            username: values.fullName,
            email: values.email,
            password: values.password,
            profileImageUrl: "",
            bio: "",
            bannerUrl: "",
            sources: [],
          };

      fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((r) => r.json())
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  });

  // ================= OAUTH GITHUB =================
  React.useEffect(() => {
    const code = searchParams.get("code");
    if (!code) return;

    setOauthUsed(true);

    const run = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/auth/github", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        const data = await res.json();

        setUsername(data.user.login);
        setEmail(data.user.email);
        setGeneratedPassword(data.user.node_id);

        formik.setFieldValue("email", data.user.email);
        formik.setFieldValue("fullName", data.user.login);
        formik.setFieldValue("password", "----------");

        window.history.replaceState({}, "", "/signup");
      } catch (err) {
        console.error("OAuth failed:", err);
        setIsPopupVisible(true);
      }
    };

    run();
  }, [searchParams]);

  // ================= GOOGLE LOGIN =================
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setOauthUsed(true);

      const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        },
      ).then((r) => r.json());

      setUsername(userInfo.name);
      setEmail(userInfo.email);
      setGeneratedPassword(userInfo.sub);

      formik.setFieldValue("email", userInfo.email);
      formik.setFieldValue("fullName", userInfo.name);
      formik.setFieldValue("password", "----------");
    },
    onError: () => console.log("Login Failed"),
  });

  const loginWithGithub = () => {
    sessionStorage.setItem("oauth_intent", "signup");

    formik.setFieldValue("email", "loading...");
    formik.setFieldValue("fullName", "loading...");

    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=Ov23lirTZyPbyJiA3yZu",
    );
  };

  return (
    <>
      <AuthShell title="SIGN UP" subtitle="New operative registration">
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <AuthField
            label="Full Name"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="JOHN DOE"
            error={formik.touched.fullName && formik.errors.fullName}
          />

          <AuthField
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="user@prism.intl"
            error={formik.touched.email && formik.errors.email}
          />

          <PasswordField
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            show={showPassword}
            setShow={setShowPassword}
            error={formik.touched.password && formik.errors.password}
          />

          {/* TERMS (UNCHANGED UI) */}
          <div className="flex items-center gap-2 pt-1">
            <Checkbox
              checked={formik.values.terms}
              onCheckedChange={(val) => formik.setFieldValue("terms", val)}
              className="border-cyan-300/40 data-[state=checked]:bg-cyan-400"
            />
            <span className="text-[9px] tracking-[0.35em] text-white/40 uppercase">
              Accept terms
            </span>
          </div>

          {formik.touched.terms && formik.errors.terms && (
            <p className="text-[10px] text-red-400 tracking-[0.2em]">
              {formik.errors.terms}
            </p>
          )}

          <Button
            type="submit"
            className="w-full h-10 rounded-md bg-gradient-to-r from-cyan-400 via-cyan-300 to-fuchsia-400 text-black font-black tracking-[0.25em] uppercase shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:scale-[1.02] transition"
          >
            Register Account
          </Button>
        </form>

        <AuthDivider />

        <OAuthButtons
          onGoogle={login}
          onGithub={loginWithGithub}
          googleLabel="Google Sign Up"
          githubLabel="GitHub Sign Up"
        />

        <p className="text-center text-[10px] tracking-[0.35em] text-white/30 uppercase pt-2">
          Already registered?{" "}
          <Link className="text-cyan-300 hover:underline" href="/login">
            Log in here
          </Link>
        </p>
      </AuthShell>

      {/* POPUP (kept as-is UI, no refactor to avoid breaking your flow) */}
      {isPopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#050a18] border border-cyan-400/20 p-6 rounded-xl w-[320px] text-center">
            <div className="text-green-400 text-4xl mb-2">✔</div>

            <p className="text-cyan-200 text-[12px] mb-4 tracking-wide">
              {!oauthUsed
                ? "Account created successfully"
                : "Since you have used oAuth, we have set a secure password for safety."}
            </p>

            {oauthUsed && (
              <div className="bg-white/5 p-3 rounded text-cyan-100 break-all flex justify-between items-center">
                {generatedPassword}
                <Button
                  className="bg-transparent"
                  onClick={() =>
                    navigator.clipboard.writeText(generatedPassword)
                  }
                >
                  <Clipboard className="text-white" />
                </Button>
              </div>
            )}

            <button
              onClick={() => {
                setIsPopupVisible(false);
                addToast({
                  title: "Success",
                  description: "Signed Up Successfully",
                });
                router.push("/login");
              }}
              className="mt-4 w-full bg-green-500/20 text-green-300 py-2 rounded"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}
