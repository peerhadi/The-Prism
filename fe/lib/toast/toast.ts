import { useToast } from "./toastStore";

export const toast = {
  success(message: string, title?: string) {
    useToast.getState().addToast({
      type: "success",
      message,
      title,
    });
  },

  error(message: string, title?: string) {
    useToast.getState().addToast({
      type: "error",
      message,
      title,
    });
  },

  warning(message: string, title?: string) {
    useToast.getState().addToast({
      type: "warning",
      message,
      title,
    });
  },

  info(message: string, title?: string) {
    useToast.getState().addToast({
      type: "info",
      message,
      title,
    });
  },
};
