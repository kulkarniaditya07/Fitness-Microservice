import type { User } from "@/types/models";

interface ProfileCardProps {
  user: User;
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <article className="card border border-slate-200 bg-white shadow-sm">
      <div className="card-body p-4">
        <h2 className="text-xl font-semibold text-dark">Profile</h2>
        <div className="mt-3 space-y-2 text-sm">
          <p>
            <span className="font-semibold">Name:</span> {user.firstName} {user.lastName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {user.userRole}
          </p>
        </div>
      </div>
    </article>
  );
};
