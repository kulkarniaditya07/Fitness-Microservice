'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    // Auth integration will be wired in API/auth implementation phase.
    console.log('Login submitted', { email, rememberMe });
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="px-4 py-10 md:px-8">
        <div className="max-w-xl mx-auto card bg-base-100 border border-base-300 shadow-xl">
          <div className="card-body">
            <h1 className="text-3xl font-black">Login</h1>
            <p className="text-sm text-neutral/70">Sign in to continue tracking your activities and progress.</p>

            {error ? <div className="alert alert-error mt-2 text-sm">{error}</div> : null}

            <form className="space-y-4 mt-2" onSubmit={handleSubmit} aria-label="Login form">
              <label className="form-control">
                <span className="label-text">Email</span>
                <input
                  className="input input-bordered"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>

              <label className="form-control">
                <span className="label-text">Password</span>
                <input
                  className="input input-bordered"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>

              <div className="flex items-center justify-between gap-3">
                <label className="label cursor-pointer gap-2 justify-start">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />
                  <span className="label-text">Remember me</span>
                </label>

                <Link href="/auth/forgot-password" className="link link-primary text-sm">
                  Forgot password?
                </Link>
              </div>

              <button className="btn btn-primary w-full" type="submit">
                Sign In
              </button>
            </form>

            <div className="divider text-xs uppercase">Or continue with</div>

            <div className="grid sm:grid-cols-2 gap-2">
              <button className="btn btn-outline" type="button">
                Google
              </button>
              <button className="btn btn-outline" type="button">
                GitHub
              </button>
            </div>

            <p className="text-sm text-neutral/70 mt-2">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
