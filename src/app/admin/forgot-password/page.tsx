"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Unable to request reset.");
      } else {
        setMessage(json.message);
      }
    } catch {
      setError("Network error while submitting request.");
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
            Reset Admin Password
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            Enter your admin email address to receive a single-use password reset link.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
        >
          <div>
            <label
              htmlFor="forgot-email"
              className="mb-1.5 block text-xs font-semibold text-[#0b1528]"
            >
              Work Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="forgot-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@webamazee.com"
                className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] py-2.5 pl-10 pr-3.5 text-sm outline-none focus:border-[#0f6dff] focus:bg-white"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-semibold text-rose-700">
              {error}
            </p>
          )}
          {message && (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs font-medium text-emerald-800">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0f6dff] text-sm font-semibold text-white hover:bg-[#0b57d0] disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Request Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
