import { IconButton } from "app/main/components/BotaoAcao/IconButton";
import { traduzir } from "app/utils/Traducao";

interface IButtonClearProps {
  value: Date | undefined | null;
  onChange: (newValue: any) => void;
}

export function ButtonClear({ value, onChange }: IButtonClearProps) {
  return (
    <>
      {!!value && (
        <div style={{ position: "absolute", right: 3, top: 1 }}>
          <IconButton
            icone="clear"
            tooltip={traduzir("Comum.limpar")}
            onClick={() => onChange(undefined)}
          />
        </div>
      )}
    </>
  );
}
