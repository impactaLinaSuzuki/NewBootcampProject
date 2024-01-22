import { useState, useEffect } from "react";
import { titleToolbarEventEmiter } from "app/utils/TitleToolbarEvento";
import { TitleToolbar } from "app/interfaces/TitleToolbar";

export function useTitleToolbar() {
  const [description, setDescription] = useState<TitleToolbar>(
    {} as TitleToolbar
  );

  useEffect(() => {
    function handleShowTitle({ title, subtitle }: TitleToolbar) {
      setDescription({
        title,
        subtitle,
      });
    }

    titleToolbarEventEmiter.on("showTitle", handleShowTitle);

    return () => {
      titleToolbarEventEmiter.removeListener("showTitle", handleShowTitle);
    };
  }, []);

  useEffect(() => {
    function handleHideTitle() {
      setDescription({} as TitleToolbar);
    }

    titleToolbarEventEmiter.on("hideTitle", handleHideTitle);

    return () => {
      titleToolbarEventEmiter.removeListener("hideTitle", handleHideTitle);
    };
  }, []);

  return {
    description,
  };
}
