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
import { ClipboardCopy } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
export default function SignInPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [oauthUsed, setOauthUsed] = React.useState(false);
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
        }).then((res) => res.json());
        setEmail(res.user.email);
        setPassword(res.user.node_id);
        formik.setFieldValue("email", res.user.email);
        formik.setFieldValue("password", res.user.node_id);
        // IMPORTANT: cleanup URL so effect doesn't re-run
        window.history.replaceState({}, "", "/login");
        sessionStorage.removeItem("oauth_intent");
      } catch (err) {
        console.error("OAuth handling failed", err);
      }
    };

    run();
  }, [searchParams]);
  // ✅ ADDED ONLY
  const [popupMessage, setPopupMessage] = React.useState("");
  const [isPopupVisible, setIsPopupVisible] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      setPopupMessage(
        "Google account linked. We generated a secure password for your account.",
      );

      const isGoogleUser = formik.values.password === "oauth-temp";

      setPopupMessage(
        isGoogleUser
          ? "Since you have signed in with Google, we have generated a password for you to keep you safe"
          : "Your account has been created successfully",
      );

      if (!oauthUsed) {
        fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            window.localStorage.setItem("token", res.token);

            window.dispatchEvent(new Event("auth-changed"));
          });
      } else {
        fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            window.localStorage.setItem("token", res.token);

            window.dispatchEvent(new Event("auth-changed"));
          });
      }
      setIsPopupVisible(true);
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
      ).then((res) => res.json());
      setOauthUsed(true);
      setEmail(userInfo.email);
      setPassword(userInfo.sub);

      formik.setFieldValue("email", userInfo.email);
      formik.setFieldValue("password", userInfo.sub);
      console.log(userInfo);
    },
    onError: () => console.log("Login Failed"),
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
            LOGIN
          </CardTitle>

          <p className="mt-1 text-center text-[10px] tracking-[0.45em] text-cyan-300/60 uppercase">
            Identity Verification Required
          </p>
        </CardHeader>

        <CardContent className="px-10 pb-12 space-y-6">
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div className="space-y-1">
              <Label className="text-[9px] tracking-[0.4em] text-white/40 uppercase">
                Email
              </Label>
              <Input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="USER@PRISM.INTL"
                className="h-10 border-cyan-300/10 bg-white/5 text-cyan-100 tracking-[0.2em] placeholder:text-white/10 focus:border-cyan-300/40 focus:ring-0"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-[10px] text-red-400 tracking-[0.2em]">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* PASSWORD */}
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
                  onClick={() => {
                    if (!isPopupVisible) setShowPassword((p) => !p);
                  }}
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

            {/* controls row */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <Checkbox className="border-cyan-300/40 data-[state=checked]:bg-cyan-400" />
                <span className="text-[9px] tracking-[0.35em] text-white/40 uppercase">
                  Persist Session
                </span>
              </div>

              <Link
                href="#"
                className="text-[9px] tracking-[0.35em] text-cyan-300/60 uppercase hover:text-cyan-300"
              >
                Lost Key?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-10 rounded-md bg-gradient-to-r from-cyan-400 via-cyan-300 to-fuchsia-400 text-black font-black tracking-[0.25em] uppercase shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:scale-[1.02] transition"
            >
              Sign In
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

          {/* external auth */}
          <div className="space-y-3">
            <Button
              type="button"
              onClick={() => login()}
              className="h-10 w-full border border-cyan-300/20 bg-white/5 text-cyan-300 hover:bg-cyan-300/10 hover:text-white transition"
            >
              <GoogleIcon sx={{ fontSize: 16 }} />
              Google Sign In
            </Button>

            <Button
              type="button"
              onClick={loginWithGithub}
              className="h-10 w-full border border-fuchsia-300/20 bg-white/5 text-fuchsia-300 hover:bg-fuchsia-300/10 hover:text-white transition"
            >
              <GitHubIcon sx={{ fontSize: 16 }} />
              GitHub Sign In
            </Button>
          </div>

          <p className="text-center text-[10px] tracking-[0.35em] text-white/30 uppercase pt-2">
            New operative?{" "}
            <Link className="text-cyan-300 hover:underline" href="/signup">
              Register here
            </Link>
          </p>
        </CardContent>

        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />
      </Card>

      {/* ===== SUCCESS POPUP (ADDED ONLY) ===== */}
      {isPopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-[400px] rounded-2xl border border-cyan-300/20 bg-[#050a18]/90 p-8 text-center shadow-[0_0_80px_rgba(34,211,238,0.25)]">
            {/* top glow line */}
            <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />

            <div className="text-green-400 text-4xl mb-3 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">
              ✔
            </div>

            <p className="text-cyan-200 text-[16px] tracking-[0.35em] uppercase mb-5">
              SUCCESSFULLY LOGGED IN
            </p>

            <Button
              onClick={() => {
                setIsPopupVisible(false);

                router.refresh();
                router.push("/");
              }}
              className="mt-6 w-full h-11 border border-green-400/30 bg-green-500/10 text-green-300 tracking-[0.2em] uppercase hover:bg-green-500/20 transition"
            >
              Continue
            </Button>

            {/* bottom glow line */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />
          </div>
        </div>
      )}
    </div>
  );
}
