import { StringToHtml } from "app/main/components/StringToHtml";

import { Container } from "./styles";

interface MensagemErroProps {
  mensagem: string | undefined;
}

export function MensagemErro({ mensagem }: MensagemErroProps) {
  if (!mensagem) return null;

  return (
    <Container>
      <StringToHtml content={mensagem} />
    </Container>
  );
}
