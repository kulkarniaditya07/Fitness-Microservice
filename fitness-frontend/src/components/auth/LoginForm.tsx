"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit?: (values: Pick<LoginFormValues, "email" | "password">) => void | Promise<void>;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const submitHandler = async (values: LoginFormValues) => {
    setServerError(null);

    if (onSubmit) {
      await onSubmit({ email: values.email, password: values.password });
      return;
    }

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (result?.error) {
      setServerError("Invalid credentials. Please try again.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(submitHandler)} noValidate>
      <div>
        <label htmlFor="email" className="label-text text-sm font-medium text-dark">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="input input-bordered mt-1 w-full"
          {...register("email")}
        />
        {errors.email ? <p className="mt-1 text-xs text-danger">{errors.email.message}</p> : null}
      </div>

      <div>
        <label htmlFor="password" className="label-text text-sm font-medium text-dark">
          Password
        </label>
        <div className="relative mt-1">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className="input input-bordered w-full pr-12"
            {...register("password")}
          />
          <button
            type="button"
            className="btn btn-ghost btn-xs absolute right-2 top-2"
            onClick={() => setShowPassword((state) => !state)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password ? (
          <p className="mt-1 text-xs text-danger">{errors.password.message}</p>
        ) : null}
      </div>

      <label className="label cursor-pointer justify-start gap-2">
        <input type="checkbox" className="checkbox checkbox-sm" {...register("rememberMe")} />
        <span className="label-text">Remember me</span>
      </label>

      {serverError ? <div className="alert alert-error text-sm">{serverError}</div> : null}

      <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-center text-sm text-slate-600">
        No account?{" "}
        <Link href="/auth/register" className="font-semibold text-primary">
          Register
        </Link>
      </p>
    </form>
  );
};
