import { ReactNode } from "react";

export interface Aba {
  id: number;
  descricao: string;
  icone?: string;
  badge?: number | ReactNode;
  cor?: string;
  disabled?: boolean;
}
