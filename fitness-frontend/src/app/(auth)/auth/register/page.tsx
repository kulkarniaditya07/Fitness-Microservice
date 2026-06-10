import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-dark">Create account</h1>
      <p className="mt-2 text-sm text-slate-600">Start tracking workouts and receiving recommendations.</p>
      <div className="mt-6">
        <RegisterForm />
      </div>
    </>
  );
}
