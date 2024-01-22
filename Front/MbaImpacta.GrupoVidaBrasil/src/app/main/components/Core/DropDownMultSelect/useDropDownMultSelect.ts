import { ChangeEvent, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IDropDown } from "app/interfaces/IDropDown";

interface IUseDropDownMultSelectProps {
  inTodos?: boolean;
  propsListaItem: IDropDown[];
  value: any;
  onChange: (listSelected: (number | string)[]) => void;
}

export function useDropDownMultSelect({
  inTodos,
  propsListaItem,
  value,
  onChange,
}: IUseDropDownMultSelectProps) {
  const { t } = useTranslation();

  const listaItem = useMemo(() => {
    if (inTodos)
      return [
        { id: -1, descricao: t("Filtros.todos") },
        ...propsListaItem,
      ] as IDropDown[];

    return propsListaItem;
  }, [propsListaItem, t, inTodos]);

  const valorTratado = useMemo(
    () => listaItem.filter((x) => (value || []).some((v: any) => v === x.id)),
    [listaItem, value]
  );

  function onChangeLocal(
    valueProps: IDropDown[],
    event: ChangeEvent<HTMLInputElement>
  ) {
    if (!valueProps.length) {
      onChange([]);
      return;
    }

    //Existir a opção "-1" (TODOS) e estiver clicando na primeira opção da lista
    if (
      listaItem.some((x) => x.id === -1) &&
      event.target.getAttribute("id") === "-1"
    ) {
      //Se TODOS estiver selecionado, marca tudo
      if (valueProps.some((x) => x.id === -1))
        onChange(listaItem.map((item) => item.id));
      //Senão, desmarca tudo
      else onChange([]);
      return;
    }

    onChange(
      valueProps.filter((item) => item.id !== -1).map((item) => item.id)
    );
  }

  function onChangeCheckGroup(
    e: ChangeEvent<HTMLInputElement>,
    valueProps: boolean,
    group: string
  ) {
    if (valueProps) {
      const listaGroupNotSelected = listaItem.filter(
        (a) => a.grupo === group && !valorTratado.some((b) => b.id === a.id)
      );
      onChangeLocal([...valorTratado, ...listaGroupNotSelected], e);
    } else {
      onChangeLocal([...valorTratado.filter((a) => a.grupo !== group)], e);
    }
  }

  return {
    listaItem,
    valorTratado,
    onChangeLocal,
    onChangeCheckGroup,
  };
}
