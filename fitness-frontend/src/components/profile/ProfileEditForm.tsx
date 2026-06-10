"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@/types/models";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

type ProfileEditValues = z.infer<typeof schema>;

interface ProfileEditFormProps {
  user: User;
  onSubmit: (values: ProfileEditValues) => Promise<void> | void;
}

export const ProfileEditForm = ({ user, onSubmit }: ProfileEditFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileEditValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  return (
    <form className="space-y-4 rounded-xl border border-slate-200 bg-white p-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-lg font-semibold text-dark">Edit Profile</h3>
      <div className="grid gap-4 sm:grid-cols-2">
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

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
};
