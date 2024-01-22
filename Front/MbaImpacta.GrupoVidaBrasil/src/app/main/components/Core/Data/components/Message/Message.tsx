import { MensagemErro } from "app/main/components/MensagemErro";
import { traduzir } from "app/utils/Traducao";

interface IMessageProps {
  mensagemErro?: string;
  mensagemErrorData: boolean;
}

export function Message({ mensagemErro, mensagemErrorData }: IMessageProps) {
  return (
    <>
      <MensagemErro mensagem={mensagemErro} />

      {mensagemErrorData && (
        <MensagemErro mensagem={traduzir("Comum.mensagemDataInvalida")} />
      )}
    </>
  );
}
