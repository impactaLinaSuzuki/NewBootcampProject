import { ReactNode } from "react";

export interface Message {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  description: string | ReactNode;
  duration: number;
}
