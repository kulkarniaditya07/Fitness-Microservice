"use client";

import { PropsWithChildren, useEffect, useRef } from "react";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

export const Modal = ({ isOpen, title, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog ref={dialogRef} className="modal modal-open" aria-labelledby="modal-title">
      <div className="modal-box max-w-2xl">
        <h3 id="modal-title" className="text-xl font-semibold text-dark">
          {title}
        </h3>
        <div className="mt-4">{children}</div>
        <div className="modal-action">
          <button type="button" className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button aria-label="Close modal">close</button>
      </form>
    </dialog>
  );
};
