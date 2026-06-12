"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useGoogleLogin } from "@react-oauth/google";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";

import AuthShell from "@/app/components/auth/AuthShell";
import AuthField from "@/app/components/auth/AuthField";
import PasswordField from "@/app/components/auth/PasswordField";
import AuthDivider from "@/app/components/auth/AuthDivider";
import OAuthButtons from "@/app/components/auth/OAuthButtons";
import SuccessPopup from "@/app/components/auth/SuccessPopup";

import { useToast } from "@/lib/toast/toastStore";

export default function SignInPage() {
  const { addToast } = useToast.getState();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = React.useState(false);
  const [oauthUsed, setOauthUsed] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPopupVisible, setIsPopupVisible] = React.useState(false);

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
        }).then((r) => r.json());

        setEmail(res.user.email);
        setPassword(res.user.node_id);

        formik.setFieldValue("email", res.user.email);
        formik.setFieldValue("password", res.user.node_id);

        window.history.replaceState({}, "", "/login");
        sessionStorage.removeItem("oauth_intent");
      } catch (err) {
        console.error("OAuth handling failed", err);
      }
    };

    run();
  }, [searchParams]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid format").required(),
      password: Yup.string().min(6).required(),
    }),

    onSubmit: async (values) => {
      setIsPopupVisible(true);

      const payload = oauthUsed
        ? { email, password }
        : { email: values.email, password: values.password };

      fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((r) => r.json())
        .then((res) => {
          window.localStorage.setItem("token", res.token);
          window.dispatchEvent(new Event("auth-changed"));
        });
    },
  });

  const loginWithGithub = () => {
    sessionStorage.setItem("oauth_intent", "login");
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=Ov23lirTZyPbyJiA3yZu",
    );
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        },
      ).then((r) => r.json());

      setOauthUsed(true);

      setEmail(userInfo.email);
      setPassword(userInfo.sub);

      formik.setFieldValue("email", userInfo.email);
      formik.setFieldValue("password", userInfo.sub);
    },
    onError: () => console.log("Login Failed"),
  });

  return (
    <>
      <AuthShell title="LOGIN" subtitle="Identity Verification Required">
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <AuthField
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="USER@PRISM.INTL"
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

          {/* controls */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <Checkbox className="border-[var(--border)] data-[state=checked]:bg-[var(--primary)]" />
              <span className="text-[9px] tracking-[0.35em] uppercase text-[var(--text-muted)]">
                Persist Session
              </span>
            </div>

            <Link
              href="#"
              className="text-[9px] tracking-[0.35em] uppercase text-[var(--accent)]/70 hover:text-[var(--accent)]"
            >
              Lost Key?
            </Link>
          </div>

          <Button
            type="submit"
            className="
              w-full h-10 rounded-md font-black tracking-[0.25em] uppercase
              bg-[var(--primary)]
              text-[var(--text-inverse)]
              shadow-[0_0_30px_var(--primary-glow)]
              hover:scale-[1.02] transition
            "
          >
            SIGN IN
          </Button>
        </form>

        <AuthDivider />

        <OAuthButtons
          onGoogle={login}
          onGithub={loginWithGithub}
          googleLabel="Google Sign In"
          githubLabel="GitHub Sign In"
        />

        <p className="text-center text-[10px] tracking-[0.35em] uppercase text-[var(--text-faint)] pt-2">
          New operative?{" "}
          <Link className="text-[var(--accent)] hover:underline" href="/signup">
            Register here
          </Link>
        </p>
      </AuthShell>

      <SuccessPopup
        open={isPopupVisible}
        addToast={addToast}
        router={router}
        onContinue={() => {
          setIsPopupVisible(false);

          addToast({
            title: "Success",
            description: "Logged In Successfully",
          });

          window.location.href = "/stories";
        }}
      />
    </>
  );
}
