"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Loader2, Lock } from "lucide-react";

function ResetPasswordInner() {
  const sp = useSearchParams();
  const initialToken = sp.get("token") ?? "";

  const [token, setToken] = useState(initialToken);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [doneEmail, setDoneEmail] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.trim(), password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Unable to set password.");
      } else {
        setDoneEmail(json.email || "your account");
      }
    } catch {
      setError("Network error while saving password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f8ff] px-4 py-12 text-[#0b1528] flex flex-col justify-center">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f6dff] hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
          </Link>
          <h1 className="mt-3 font-display text-2xl font-bold text-[#0b1528]">
            Set New Password
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            Use at least 10 characters with uppercase, lowercase, and a number or symbol.
          </p>
        </div>

        {doneEmail ? (
          <div className="rounded-3xl border border-emerald-200 bg-white p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
              <p className="font-display font-bold">Password Updated</p>
            </div>
            <p className="text-sm text-slate-600">
              Password has been set for <strong>{doneEmail}</strong>. All older sessions were revoked.
            </p>
            <Link
              href="/admin/login"
              className="flex h-11 w-full items-center justify-center rounded-xl bg-[#0f6dff] text-sm font-semibold text-white"
            >
              Sign In Now
            </Link>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
          >
            {!initialToken && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#0b1528]">
                  Single-Use Token
                </label>
                <input
                  type="text"
                  required
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Paste invite or reset token"
                  className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-3.5 py-2.5 text-sm outline-none focus:border-[#0f6dff] focus:bg-white"
                />
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#0b1528]">
                New Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 10 strong characters"
                  className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] py-2.5 pl-10 pr-3.5 text-sm outline-none focus:border-[#0f6dff] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#0b1528]">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter password"
                className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-3.5 py-2.5 text-sm outline-none focus:border-[#0f6dff] focus:bg-white"
              />
            </div>

            {error && (
              <p className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-semibold text-rose-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0f6dff] text-sm font-semibold text-white hover:bg-[#0b57d0] disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4f8ff]" />}>
      <ResetPasswordInner />
    </Suspense>
  );
}
