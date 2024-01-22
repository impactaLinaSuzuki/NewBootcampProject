import { ReactNode } from "react";
import FuseUtils from "@fuse/utils/FuseUtils";

export const toastEventEmiter = new FuseUtils.EventEmitter();

export function ExibirMensagem(
  title: string,
  description: string | ReactNode,
  type: "success" | "error" | "warning" | "info" = "success",
  duration = 3000
): void {
  toastEventEmiter.emit("addMessage", {
    title,
    description,
    type: type || "success",
    duration: type === "warning" ? 8000 : duration || 3000,
  });
}
