import { create } from "zustand";

export type Toast = {
  id: string;
  title: string;
  description: string;
  duration?: number;
};

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

export const useToast = create<ToastState>((set, get) => ({
  toasts: [],

  addToast: (toast) => {
    const id = crypto.randomUUID();

    set({
      toasts: [...get().toasts, { id, duration: 3000, ...toast }],
    });
  },

  removeToast: (id) => {
    set({
      toasts: get().toasts.filter((t) => t.id !== id),
    });
  },
}));
