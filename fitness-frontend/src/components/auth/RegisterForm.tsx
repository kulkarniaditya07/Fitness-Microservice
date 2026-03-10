"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userService } from "@/services/api/userService";

const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[0-9]/, "Must include a number")
      .regex(/[^A-Za-z0-9]/, "Must include a symbol"),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((value) => value, "You must accept the terms"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const scorePassword = (password: string) => {
  let score = 0;
  if (password.length >= 8) score += 25;
  if (/[A-Z]/.test(password)) score += 25;
  if (/[0-9]/.test(password)) score += 25;
  if (/[^A-Za-z0-9]/.test(password)) score += 25;
  return score;
};

export const RegisterForm = () => {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const password = useWatch({ control, name: "password" }) ?? "";
  const passwordScore = useMemo(() => scorePassword(password), [password]);

  const onSubmit = async (values: RegisterFormValues) => {
    setSubmitMessage(null);
    try {
      await userService.createUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
      setSubmitMessage("Registration successful. Redirecting to sign in...");
      setTimeout(() => router.push("/auth/login"), 900);
    } catch (error) {
      const rawMessage =
        typeof error === "object" && error !== null && "message" in error
          ? error.message
          : null;
      const message = Array.isArray(rawMessage)
        ? rawMessage.join(", ")
        : typeof rawMessage === "string"
          ? rawMessage
          : "Registration failed. Please try again.";
      setSubmitMessage(message);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="label-text text-sm font-medium text-dark">
            First name
          </label>
          <input id="firstName" className="input input-bordered mt-1 w-full" {...register("firstName")} />
          {errors.firstName ? <p className="mt-1 text-xs text-danger">{errors.firstName.message}</p> : null}
        </div>
        <div>
          <label htmlFor="lastName" className="label-text text-sm font-medium text-dark">
            Last name
          </label>
          <input id="lastName" className="input input-bordered mt-1 w-full" {...register("lastName")} />
          {errors.lastName ? <p className="mt-1 text-xs text-danger">{errors.lastName.message}</p> : null}
        </div>
      </div>

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
        <input
          id="password"
          type="password"
          className="input input-bordered mt-1 w-full"
          {...register("password")}
        />
        <progress className="progress progress-primary mt-2 w-full" value={passwordScore} max={100} />
        {errors.password ? <p className="mt-1 text-xs text-danger">{errors.password.message}</p> : null}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="label-text text-sm font-medium text-dark">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="input input-bordered mt-1 w-full"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword ? (
          <p className="mt-1 text-xs text-danger">{errors.confirmPassword.message}</p>
        ) : null}
      </div>

      <label className="label cursor-pointer justify-start gap-2">
        <input type="checkbox" className="checkbox checkbox-sm" {...register("acceptTerms")} />
        <span className="label-text">I agree to the terms and privacy policy</span>
      </label>
      {errors.acceptTerms ? (
        <p className="mt-1 text-xs text-danger">{errors.acceptTerms.message}</p>
      ) : null}

      {submitMessage ? <div className="alert text-sm">{submitMessage}</div> : null}

      <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-semibold text-primary">
          Login
        </Link>
      </p>
    </form>
  );
};
