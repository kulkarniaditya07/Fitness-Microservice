"use client";

import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { UserStats } from "@/components/profile/UserStats";
import { userService } from "@/services/api/userService";
import { useNotificationStore } from "@/store/notificationStore";
import { UserRole, type User } from "@/types/models";

const buildUserModel = (payload: Partial<User> | undefined, fallbackId: number): User => ({
  id: payload?.id ?? fallbackId,
  email: payload?.email ?? "",
  firstName: payload?.firstName ?? "",
  lastName: payload?.lastName ?? "",
  userRole: payload?.userRole ?? UserRole.USER,
  createdAt: payload?.createdAt ?? new Date().toISOString(),
  updatedAt: payload?.updatedAt ?? new Date().toISOString(),
});

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
  const addNotification = useNotificationStore((state) => state.add);
  const userId = session?.user?.id ?? 1;

  const userQuery = useQuery({
    queryKey: ["user", userId],
    queryFn: () => userService.getUser(userId),
    enabled: userId > 0,
  });

  const updateUserMutation = useMutation({
    mutationFn: (payload: { firstName: string; lastName: string }) =>
      userService.updateUser(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
  });

  const user = useMemo(
    () => buildUserModel(userQuery.data?.data, userId),
    [userQuery.data?.data, userId],
  );

  if (status === "loading" || userQuery.isLoading) {
    return <LoadingSpinner label="Loading profile..." />;
  }

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-dark">Profile</h1>
        <p className="text-sm text-slate-600">Manage your personal details.</p>
      </header>

      {userQuery.isError ? (
        <div className="alert alert-error">Unable to load profile.</div>
      ) : (
        <>
          <UserStats />
          <ProfileCard user={user} />

          <ProfileEditForm
            user={user}
            onSubmit={async (values) => {
              try {
                await updateUserMutation.mutateAsync(values);
                addNotification({
                  type: "success",
                  message: "Profile updated successfully",
                });
              } catch {
                addNotification({
                  type: "error",
                  message: "Profile update failed",
                });
              }
            }}
          />
        </>
      )}
    </section>
  );
}
