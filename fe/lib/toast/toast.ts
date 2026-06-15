import { useToast } from "./toastStore";

export const toast = {
  success(message: string, title?: string) {
    useToast.getState().addToast({
      type: "success",
      description: message,
      title,
    });
  },

  error(message: string, title?: string) {
    useToast.getState().addToast({
      type: "error",
      description: message,
      title,
    });
  },

  warning(message: string, title?: string) {
    useToast.getState().addToast({
      type: "warning",
      description: message,
      title,
    });
  },

  info(message: string, title?: string) {
    useToast.getState().addToast({
      type: "info",
      description: message,
      title,
    });
  },
};
