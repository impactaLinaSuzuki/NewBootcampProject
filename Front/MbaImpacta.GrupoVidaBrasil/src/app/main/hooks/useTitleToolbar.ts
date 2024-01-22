import { useEffect, ReactNode } from "react";
import { hideTitle, showTitle } from "app/utils/TitleToolbarEvento";

export function useTitleToolbar(
  title: string | ReactNode,
  subtitle?: string | ReactNode,
  exibeTitleToolbar?: boolean
) {
  useEffect(() => {
    if (exibeTitleToolbar) showTitle(title || "", subtitle || "");

    return () => {
      if (exibeTitleToolbar) hideTitle();
    };
  }, [exibeTitleToolbar, title, subtitle]);
}
