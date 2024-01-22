import { Message } from "app/interfaces/Message";
import { useEffect } from "react";

export interface ToastMessageProps {
  message: Message;
  onRemoveMessage: (id: string) => void;
}

export function useToastMessage({
  message,
  onRemoveMessage,
}: ToastMessageProps) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return {
    handleRemoveToast,
  };
}
