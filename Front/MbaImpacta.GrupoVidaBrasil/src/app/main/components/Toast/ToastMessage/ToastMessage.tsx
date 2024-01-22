import { Typography, Alert, AlertTitle } from "@mui/material";

import { useToastMessage, ToastMessageProps } from "./useToastMessage";
import { IconButton } from "../../BotaoAcao";

export function ToastMessage({ message, onRemoveMessage }: ToastMessageProps) {
  const { handleRemoveToast } = useToastMessage({ message, onRemoveMessage });

  return (
    <Alert
      className="alertRoot"
      severity={message.type}
      action={
        <IconButton
          icone="close"
          className="icon MuiAlert-icon"
          size="small"
          onClick={handleRemoveToast}
        />
      }
    >
      {message.title && <AlertTitle>{message.title}</AlertTitle>}

      <div className="message">
        {typeof message.description === "string" ? (
          <Typography>{message.description}</Typography>
        ) : (
          message.description
        )}
      </div>
    </Alert>
  );
}
