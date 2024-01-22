import { SyntheticEvent } from "react";
import { useCallback, useState, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import API from "app/services/axiosAPI";
import { IDropDown } from "app/interfaces/IDropDown";

interface IUseDropDownAutoLoadProps {
  urlAPI: string;
  incluirOpcaoTodos?: boolean;
  recarregar?: boolean;
  setRecarregar?: (value: boolean) => void;
  autoBuscar?: boolean;
  autoSelect?: boolean;
  onChange: (
    valor: IDropDown | IDropDown[] | (string | number)[],
    event?: SyntheticEvent<Element, Event> | null
  ) => void;
  value: any;
  textValue?: string;
  retornaItensDropDown?: (value: any) => void;
}

export function useDropDownAutoLoad({
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
}: IUseDropDownAutoLoadProps) {
  const { t } = useTranslation();
  const [listaItem, setListaItem] = useState<IDropDown[]>([] as IDropDown[]);
  const [loading, setLoading] = useState(false);
  const [erroCarregando, setErroCarregando] = useState(false);
  const [executaAutoSelect, setExecutaAutoSelect] = useState(false);

  const isDesmontadoRef = useRef(false);
  const oldUrl = useRef(urlAPI);

  const CarregaDadosDropDown = useCallback(() => {
    setLoading(true);
    setErroCarregando(false);

    API.getAPI(urlAPI)
      .then((response) => {
        if (isDesmontadoRef.current) return;

        if (incluirOpcaoTodos) {
          setListaItem([
            {
              id: -1,
              text: t("Filtros.todos"),
              descricao: t("Filtros.todos"),
            },
            ...response.data,
          ]);
        } else {
          setListaItem(response.data);
        }
        if (!!retornaItensDropDown) retornaItensDropDown(response.data);
      })
      .catch(() => {
        if (isDesmontadoRef.current) return;

        setErroCarregando(true);
      })
      .finally(() => {
        setLoading(false);
        setExecutaAutoSelect(true);
      });
  }, [urlAPI, incluirOpcaoTodos, t, retornaItensDropDown]);

  useEffect(() => {
    if (recarregar) {
      CarregaDadosDropDown();
      if (setRecarregar) setRecarregar(false);
    }
  }, [recarregar, CarregaDadosDropDown, setRecarregar]);

  useEffect(() => {
    isDesmontadoRef.current = false;

    if (autoBuscar) CarregaDadosDropDown();

    return () => {
      isDesmontadoRef.current = true;
    };
  }, [autoBuscar, CarregaDadosDropDown]);

  useEffect(() => {
    isDesmontadoRef.current = false;

    if (urlAPI !== oldUrl.current) {
      CarregaDadosDropDown();

      oldUrl.current = urlAPI;
    }

    return () => {
      isDesmontadoRef.current = true;
    };
  }, [urlAPI, CarregaDadosDropDown]);

  useEffect(() => {
    if (!executaAutoSelect) return;

    setExecutaAutoSelect(false);

    if (autoSelect && listaItem && listaItem.length === 1) {
      onChange(listaItem[0], null);
    }
  }, [listaItem, autoSelect, executaAutoSelect, onChange]);

  function onOpenDropDown() {
    if (!listaItem || !listaItem.length) CarregaDadosDropDown();
  }

  const listItems = useMemo(() => {
    return (
      listaItem ||
      ((value !== null && value !== undefined && textValue
        ? [{ id: value, text: textValue }]
        : []) as IDropDown[])
    );
  }, [listaItem, value, textValue]);

  return {
    listItems,
    loading,
    erroCarregando,
    t,
    onOpenDropDown,
    CarregaDadosDropDown,
  };
}
