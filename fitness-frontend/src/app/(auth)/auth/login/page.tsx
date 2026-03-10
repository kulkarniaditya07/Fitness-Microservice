import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-dark">Sign in</h1>
      <p className="mt-2 text-sm text-slate-600">Access your fitness dashboard and recent activity.</p>
      <div className="mt-6">
        <LoginForm />
      </div>
    </>
  );
}
