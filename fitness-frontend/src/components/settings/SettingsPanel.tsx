'use client';

import { useState } from 'react';

export function SettingsPanel() {
  const [notifications, setNotifications] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm">
      <div className="card-body">
        <h3 className="card-title">Settings</h3>
        <label className="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={notifications}
            onChange={() => setNotifications((value) => !value)}
          />
          <span className="label-text">Enable workout reminders</span>
        </label>

        <label className="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            className="toggle toggle-secondary"
            checked={privacyMode}
            onChange={() => setPrivacyMode((value) => !value)}
          />
          <span className="label-text">Private activity mode</span>
        </label>
      </div>
    </div>
  );
}
