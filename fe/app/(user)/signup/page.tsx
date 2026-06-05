"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useGoogleLogin } from "@react-oauth/google";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { Clipboard } from "lucide-react";
import { navigate } from "next/dist/client/components/segment-cache/navigation";
import { useToast } from "@/lib/toast/toastStore";
export default function SignUpPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [oauthUsed, setOauthUsed] = React.useState(false);
  const [isPopupVisible, setIsPopupVisible] = React.useState(false);
  const [generatedPassword, setGeneratedPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let pass = "";
    for (let i = 0; i < 12; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }
    return pass;
  };
  const searchParams = useSearchParams();

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

        let data: any = {};
        try {
          data = await res.json();
        } catch {
          data = {};
        }
        console.log(data);
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
  const router = useRouter();
  const { addToast } = useToast.getState();
  const loginWithGithub = () => {
    sessionStorage.setItem("oauth_intent", "signup");

    // pre-fill instantly (UX improvement)
    formik.setFieldValue("email", "loading...");
    formik.setFieldValue("fullName", "loading...");

    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=Ov23lirTZyPbyJiA3yZu",
    );
  };

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
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setUsername(res.name);
          setEmail(res.email);
          setGeneratedPassword(res.sub);

          formik.setFieldValue("email", res.email);
          formik.setFieldValue("fullName", res.name);
          formik.setFieldValue("password", "----------");
        });
      // fill form (IMPORTANT)

      console.log(userInfo);
    },
    onError: () => console.log("Login Failed"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      terms: false,
    },

    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(2, "Too short")
        .required("Full name is required"),

      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

      terms: Yup.boolean().oneOf([true], "You must accept terms"),
    }),

    onSubmit: async (values) => {
      if (!oauthUsed) {
        fetch("http://localhost:8080/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: values.fullName,
            email: values.email,
            password: values.password,
            profileImageUrl: "",
            bio: "",
            bannerUrl: "",
            sources: [],
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      } else {
        fetch("http://localhost:8080/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            email: email,
            password: generatedPassword,
            profileImageUrl: "",
            bio: "",
            bannerUrl: "",
            sources: [],
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      }
      setIsPopupVisible(true);
      console.log(values);
    },
  });

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#040816] px-4">
      {/* ===== NEON FIELD ===== */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] bg-cyan-400/10 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] bg-fuchsia-500/10 blur-[160px] animate-pulse" />

        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <Card className="relative w-full max-w-[500px] rounded-[22px] border border-cyan-300/20 bg-white/5 backdrop-blur-3xl shadow-[0_0_90px_rgba(34,211,238,0.25)]">
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_#22d3ee]" />

        <CardHeader className="pt-10 pb-6">
          <CardTitle className="text-center text-[36px] font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-fuchsia-400 uppercase">
            SIGN UP
          </CardTitle>

          <p className="mt-1 text-center text-[10px] tracking-[0.45em] text-cyan-300/60 uppercase">
            New operative registration
          </p>
        </CardHeader>

        <CardContent className="px-10 pb-12 space-y-5">
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* FULL NAME */}
            <div className="space-y-1">
              <Label className="text-[9px] tracking-[0.4em] text-white/40 uppercase">
                Full Name
              </Label>
              <Input
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="JOHN DOE"
                className="h-10 border-cyan-300/10 bg-white/5 text-cyan-100 tracking-[0.2em] placeholder:text-white/10 focus:border-cyan-300/40 focus:ring-0"
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-[10px] text-red-400 tracking-[0.2em]">
                  {formik.errors.fullName}
                </p>
              )}
            </div>

            {/* EMAIL (NO UPPERCASE EFFECT) */}
            <div className="space-y-1">
              <Label className="text-[9px] tracking-[0.4em] text-white/40 uppercase">
                Email
              </Label>
              <Input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="user@prism.intl"
                className="h-10 border-cyan-300/10 bg-white/5 text-cyan-100 tracking-[0.2em] placeholder:text-white/10 focus:border-cyan-300/40 focus:ring-0"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-[10px] text-red-400 tracking-[0.2em]">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* PASSWORD (WITH EYE TOGGLE) */}
            <div className="space-y-1">
              <Label className="text-[9px] tracking-[0.4em] text-white/40 uppercase">
                Password
              </Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="••••••••"
                  className="h-10 border-cyan-300/10 bg-white/5 text-cyan-100 pr-10 focus:border-cyan-300/40 focus:ring-0"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-300/70 hover:text-cyan-200"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </button>
              </div>

              {formik.touched.password && formik.errors.password && (
                <p className="text-[10px] text-red-400 tracking-[0.2em]">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* TERMS */}
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

          {/* divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[9px] tracking-[0.35em] text-white/20 uppercase">
              External Auth
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* socials */}
          <div className="space-y-3">
            <Button
              type="button"
              onClick={() => login()}
              className="h-10 w-full border border-cyan-300/20 bg-white/5 text-cyan-300 hover:bg-cyan-300/10 hover:text-white transition"
            >
              <GoogleIcon sx={{ fontSize: 16 }} />
              Google Sign Up
            </Button>

            <Button
              type="button"
              onClick={loginWithGithub}
              className="h-10 w-full border border-fuchsia-300/20 bg-white/5 text-fuchsia-300 hover:bg-fuchsia-300/10 hover:text-white transition"
            >
              <GitHubIcon sx={{ fontSize: 16 }} />
              GitHub Sign Up
            </Button>
          </div>

          <p className="text-center text-[10px] tracking-[0.35em] text-white/30 uppercase pt-2">
            Already registered?{" "}
            <Link className="text-cyan-300 hover:underline" href="/login">
              Log in here
            </Link>
          </p>
        </CardContent>

        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />
      </Card>
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
    </div>
  );
}
