import { useEffect, useState, useCallback } from "react";
import FuseUtils from "@fuse/utils";
import { Message } from "app/interfaces/Message";
import { toastEventEmiter } from "app/utils/ExibirMensagem";

export function useToastContainer() {
  const [listMessage, setListMessage] = useState<Message[]>([] as Message[]);

  useEffect(() => {
    function handleAddMessage({ title, description, type, duration }: Message) {
      setListMessage((prevState) => [
        ...prevState,
        {
          id: FuseUtils.generateGUID(),
          type,
          title,
          description,
          duration,
        },
      ]);
    }

    toastEventEmiter.on("addMessage", handleAddMessage);

    return () => {
      toastEventEmiter.removeListener("addMessage", handleAddMessage);
    };
  }, []);

  const handleRemoveMessage = useCallback((id: string) => {
    if (!id) return;

    setListMessage((prevState) =>
      prevState.filter((message) => message.id !== id)
    );
  }, []);

  return {
    listMessage,
    handleRemoveMessage,
  };
}
