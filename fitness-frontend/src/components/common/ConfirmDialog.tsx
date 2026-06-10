"use client";

import { Modal } from "@/components/common/Modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  description: string;
  confirmText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = ({
  isOpen,
  title = "Confirm Action",
  description,
  confirmText = "Confirm",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onCancel}>
      <p className="text-sm text-dark">{description}</p>
      <div className="mt-6 flex justify-end gap-2">
        <button type="button" className="btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="btn btn-error" onClick={onConfirm}>
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};
