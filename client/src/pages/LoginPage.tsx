import { useState, type FormEvent } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ApiRequestError } from '../lib/api';
import { Field, Spinner } from '../components/ui';

export function LoginPage() {
  const { login, register, needsSetup } = useAuth();
  const toast = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Mirror the server rules so users get instant feedback.
    const next: Record<string, string> = {};
    if (needsSetup && !name.trim()) next.name = 'Your name is required';
    if (!email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Enter a valid email address';
    if (!password) next.password = 'Password is required';
    else if (needsSetup && password.length < 8) next.password = 'Use at least 8 characters';
    if (Object.keys(next).length) return setErrors(next);

    setSubmitting(true);
    try {
      if (needsSetup) {
        await register(name.trim(), email.trim(), password);
        toast.success('Admin account created. Welcome to Webamazee.');
      } else {
        await login(email.trim(), password);
        toast.success('Signed in successfully');
      }
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setErrors(err.toFieldMap());
        toast.error(err.message);
      } else {
        toast.error('Unexpected error, please try again');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
      <div className="w-full max-w-[420px]">
        <div className="mb-7 flex flex-col items-center text-center">
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand font-display text-xl font-bold text-white">
            W
          </span>
          <h1 className="text-2xl font-bold text-ink">Webamazee Invoices</h1>
          <p className="mt-1.5 text-sm text-ink-muted">
            {needsSetup
              ? 'Create the admin account to get started.'
              : 'Sign in to manage your invoices.'}
          </p>
        </div>

        <form onSubmit={onSubmit} className="wm-card space-y-4 p-6" noValidate>
          {needsSetup ? (
            <Field label="Your name" error={errors.name} required>
              <input
                className="wm-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Webamazee Admin"
                autoComplete="name"
              />
            </Field>
          ) : null}

          <Field label="Email" error={errors.email} required>
            <input
              className="wm-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@webamazee.com"
              autoComplete="username"
            />
          </Field>

          <Field
            label="Password"
            error={errors.password}
            required
            hint={needsSetup ? 'Minimum 8 characters.' : undefined}
          >
            <input
              className="wm-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete={needsSetup ? 'new-password' : 'current-password'}
            />
          </Field>

          <button type="submit" className="wm-btn-primary w-full" disabled={submitting}>
            {submitting ? <Spinner size={16} /> : null}
            {needsSetup ? 'Create admin account' : 'Sign in'}
          </button>

          <p className="flex items-center justify-center gap-1.5 pt-1 text-xs text-ink-soft">
            <ShieldCheck size={13} />
            Protected internal tool
          </p>
        </form>
      </div>
    </div>
  );
}
