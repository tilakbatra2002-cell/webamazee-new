"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

interface LoginFormProps {
  authReady: boolean;
  nextPath?: string;
}

export function LoginForm({ authReady, nextPath }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Sign in failed.");
        return;
      }

      const safeDest =
        nextPath && nextPath.startsWith("/admin") && !nextPath.startsWith("//")
          ? nextPath
          : "/admin";
      router.push(safeDest);
      router.refresh();
    } catch {
      setError("Network error while signing in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f8ff] px-4 py-12 text-[#0b1528] flex flex-col justify-center">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#0b1528] font-display text-lg font-bold text-white shadow-lg">
            W
          </div>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f6dff]">
            Webamazee Content Studio
          </p>
          <h1 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-[#0b1528]">
            Admin Sign In
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Authorized editorial and administrator accounts only.
          </p>
        </div>

        {!authReady && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="font-bold">CMS Setup Incomplete</p>
              <p className="mt-1 leading-relaxed">
                Configure <code>MONGODB_URI</code> and a 32+ character{" "}
                <code>SESSION_SECRET</code> in environment variables, then run{" "}
                <code>npm run cms:bootstrap-admin</code> to create your initial Super Admin account.
              </p>
            </div>
          </div>
        )}

        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(11,21,40,0.18)] sm:p-8 space-y-4"
        >
          <div>
            <label
              htmlFor="login-email"
              className="mb-1.5 block text-xs font-semibold text-[#0b1528]"
            >
              Work Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@webamazee.com"
                className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] py-2.5 pl-10 pr-3.5 text-sm outline-none transition-colors focus:border-[#0f6dff] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="login-password"
                className="text-xs font-semibold text-[#0b1528]"
              >
                Password
              </label>
              <Link
                href="/admin/forgot-password"
                className="text-xs font-semibold text-[#0f6dff] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] py-2.5 pl-10 pr-10 text-sm outline-none transition-colors focus:border-[#0f6dff] focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0b1528]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-semibold text-rose-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !authReady}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0f6dff] text-sm font-semibold text-white shadow-[0_12px_28px_-10px_rgba(15,109,255,0.65)] transition-colors hover:bg-[#0b57d0] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Signing in...
              </>
            ) : (
              "Sign In to CMS"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          <Link href="/blog" className="font-semibold text-[#0f6dff] hover:underline">
            &larr; Return to Webamazee Blog
          </Link>
        </p>
      </div>
    </div>
  );
}
