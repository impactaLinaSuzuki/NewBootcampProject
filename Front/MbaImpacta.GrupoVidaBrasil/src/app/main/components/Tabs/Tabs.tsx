import {
  CSSProperties,
  JSXElementConstructor,
  ReactElement,
  SyntheticEvent,
} from "react";
import { useTranslation } from "react-i18next";
import { Container, Content, Indicator } from "./styles";
import { Aba } from "app/interfaces/Aba";
import { IconPersonalizado } from "../Icon";
import { RetornaDescricao } from "app/utils/Traducao";

interface TabsProps {
  value: number;
  abas: Aba[];
  onChange?: (e: SyntheticEvent<Element, Event>, value: number) => void;
}

export function Tabs({ value, onChange, abas }: TabsProps) {
  const { t } = useTranslation();

  return (
    <Container
      value={value}
      onChange={onChange}
      indicatorColor="secondary"
      textColor="secondary"
      variant="scrollable"
      scrollButtons={true}
      allowScrollButtonsMobile
    >
      {abas.map((abaAtual) => {
        let icone:
          | ReactElement<any, string | JSXElementConstructor<any>>
          | undefined = undefined;

        if (abaAtual.icone) {
          if (abaAtual.badge) {
            icone = (
              <Indicator badgeContent={abaAtual.badge} color="default">
                <IconPersonalizado iconName={abaAtual.icone} size={20} />
              </Indicator>
            );
          } else {
            icone = <IconPersonalizado iconName={abaAtual.icone} size={20} />;
          }
        }

        let style: CSSProperties | undefined = undefined;
        if (abaAtual.cor) style = { color: abaAtual.cor };

        return (
          <Content
            key={`${abaAtual.id}`}
            value={abaAtual.id}
            label={RetornaDescricao(t, abaAtual.descricao)}
            icon={icone}
            disabled={abaAtual.disabled && abaAtual.disabled}
            style={style}
            wrapped
          />
        );
      })}
    </Container>
  );
}
