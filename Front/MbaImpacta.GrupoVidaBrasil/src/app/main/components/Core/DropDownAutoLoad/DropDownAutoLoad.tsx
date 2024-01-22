import { SyntheticEvent } from "react";
import { DropDown } from "app/main/components/Core/DropDown";
import {
  DropDownMultSelect,
  IDropDownMultSelectProps,
} from "app/main/components/Core/DropDownMultSelect";
import { MensagemErro } from "app/main/components/MensagemErro";
import { IDropDown } from "app/interfaces/IDropDown";

import { useDropDownAutoLoad } from "./useDropDownAutoLoad";
import { Buscar } from "../../BotaoAcao";

interface IDropDownAutoLoadProps
  extends Omit<IDropDownMultSelectProps, "onChange" | "listaItem"> {
  onChange: (
    valor: IDropDown | IDropDown[] | (string | number)[],
    event?: SyntheticEvent<Element, Event> | null
  ) => void;
  urlAPI: string;
  textValue?: string;
  autoBuscar?: boolean;
  incluirOpcaoTodos?: boolean;
  recarregar?: boolean;
  setRecarregar?: (value: boolean) => void;
  retornaItensDropDown?: (value: any) => void;
}

export function DropDownAutoLoad({
  urlAPI,
  value,
  textValue,
  autoBuscar,
  autoSelect,
  incluirOpcaoTodos,
  multiple,
  label,
  onChange,
  recarregar,
  setRecarregar,
  retornaItensDropDown,
  ...rest
}: IDropDownAutoLoadProps) {
  const {
    CarregaDadosDropDown,
    listItems,
    onOpenDropDown,
    loading,
    erroCarregando,
    t,
  } = useDropDownAutoLoad({
    urlAPI,
    incluirOpcaoTodos,
    recarregar,
    setRecarregar,
    autoBuscar,
    autoSelect,
    onChange,
    value,
    textValue,
    retornaItensDropDown,
  });

  return erroCarregando ? (
    <div className="my-4">
      <div className="mb-4 ml-8">
        <MensagemErro mensagem={t("Comum.erroCarregandoDados")} />
      </div>

      <Buscar
        title={t("Comum.tentarNovamente")}
        icon="search"
        onClick={CarregaDadosDropDown}
      />
    </div>
  ) : (
    <>
      {multiple ? (
        <DropDownMultSelect
          label={label}
          value={value}
          listaItem={listItems}
          loading={loading}
          onOpen={onOpenDropDown}
          RecarregaDropDown={CarregaDadosDropDown}
          onChange={onChange}
          {...rest}
        />
      ) : (
        <DropDown
          label={label}
          value={value}
          listaItem={listItems}
          loading={loading}
          onOpen={onOpenDropDown}
          RecarregaDropDown={CarregaDadosDropDown}
          onChange={onChange}
          {...rest}
        />
      )}
    </>
  );
}
