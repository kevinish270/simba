"use client";
import { Suspense, useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { useTranslation } from "@/store/LanguageContext";
import Image from "next/image";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  
  const urlError = searchParams.get("error");

  useEffect(() => {
    if (urlError === "OAuthAccountNotLinked") {
      setError("An account with this email already exists. Please log in with your password first to link your Google account.");
    } else if (urlError) {
      setError("Authentication failed. Please try again.");
    }
  }, [urlError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Hint: Use 'password123'");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-10 border border-slate-100">
        <div className="text-center mb-10">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <Image
              src="/logo.png"
              alt="Simba Supermarket Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{t('auth.welcomeBack')}</h1>
          <p className="text-slate-500 mt-2">{t('auth.loginToAccount')}</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold mb-6 flex items-center gap-2">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">{t('auth.email')}</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary transition-all font-medium"
                placeholder="email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">{t('auth.password')}</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary transition-all font-medium"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="text-right">
            <Link href="#" className="text-xs font-bold text-primary hover:underline">{t('auth.forgotPassword')}</Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-slate-900 font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><LogIn className="h-5 w-5" /> {t('common.login').toUpperCase()}</>}
          </button>
        </form>

        <GoogleSignInButton label={t('auth.signInWithGoogle')} />

        <div className="mt-10 text-center">
          <p className="text-slate-400 text-sm font-medium">
            {t('auth.dontHaveAccount')}{" "}
            <Link href="/register" className="text-primary font-black hover:underline">{t('common.register')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <p role="status" className="flex items-center gap-2 text-slate-600">
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Loading sign-in...
          </p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
