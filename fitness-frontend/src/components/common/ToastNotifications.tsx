"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/store/notificationStore";

const alertClassMap = {
  success: "alert-success",
  error: "alert-error",
  info: "alert-info",
  warning: "alert-warning",
} as const;

export const ToastNotifications = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const remove = useNotificationStore((state) => state.remove);
  const visibleNotifications = notifications.slice(-3);

  useEffect(() => {
    const timers = visibleNotifications.map((notification) =>
      setTimeout(() => remove(notification.id), notification.autoDismissMs ?? 5000),
    );
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [visibleNotifications, remove]);

  return (
    <div className="toast toast-end toast-bottom z-[1000]">
      {visibleNotifications.map((notification) => (
        <div
          key={notification.id}
          role="alert"
          className={`alert shadow-lg ${alertClassMap[notification.type]}`}
        >
          <span>{notification.message}</span>
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            aria-label="Dismiss notification"
            onClick={() => remove(notification.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
