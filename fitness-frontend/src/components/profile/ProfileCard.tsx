import React from 'react';

export function ProfileCard() {
  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content rounded-full w-16">
              <span className="text-xl">AK</span>
            </div>
          </div>
          <div>
            <h3 className="font-black text-xl">Aditya Kulkarni</h3>
            <p className="text-sm text-neutral/70">aditya@example.com</p>
            <p className="text-xs text-neutral/60 mt-1">Member since Feb 20, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
