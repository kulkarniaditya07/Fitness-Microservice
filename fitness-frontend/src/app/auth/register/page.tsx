'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';

export default function RegisterPage() {
  const [password, setPassword] = useState('');

  const score = useMemo(() => {
    let value = 0;
    if (password.length >= 8) value += 25;
    if (/[A-Z]/.test(password)) value += 25;
    if (/[0-9]/.test(password)) value += 25;
    if (/[^A-Za-z0-9]/.test(password)) value += 25;
    return value;
  }, [password]);

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="px-4 py-10 md:px-8">
        <div className="max-w-xl mx-auto card bg-base-100 border border-base-300 shadow-xl">
          <div className="card-body">
            <h1 className="text-3xl font-black">Create Account</h1>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="form-control">
                <span className="label-text">First name</span>
                <input className="input input-bordered" type="text" />
              </label>
              <label className="form-control">
                <span className="label-text">Last name</span>
                <input className="input input-bordered" type="text" />
              </label>
            </div>

            <label className="form-control mt-1">
              <span className="label-text">Email</span>
              <input className="input input-bordered" type="email" placeholder="you@example.com" />
            </label>

            <label className="form-control mt-1">
              <span className="label-text">Password</span>
              <input
                className="input input-bordered"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 chars"
              />
              <progress className="progress progress-primary mt-2" value={score} max={100} />
              <span className="text-xs text-neutral/70">Strength: {score}%</span>
            </label>

            <button className="btn btn-primary mt-4">Register</button>
            <p className="text-sm text-neutral/70 mt-2">
              Already registered?{' '}
              <Link href="/auth/login" className="link link-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
