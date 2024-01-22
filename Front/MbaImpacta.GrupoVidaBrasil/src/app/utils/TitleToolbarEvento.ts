import { ReactNode } from "react";
import FuseUtils from "@fuse/utils/FuseUtils";

export const titleToolbarEventEmiter = new FuseUtils.EventEmitter();

export function showTitle(
  title: string | ReactNode,
  subtitle?: string | ReactNode
): void {
  titleToolbarEventEmiter.emit("showTitle", {
    title,
    subtitle,
  });
}

export function hideTitle(): void {
  titleToolbarEventEmiter.emit("hideTitle");
}
