import { useState, useCallback } from "react";
import { ErroApi } from "app/interfaces/ErroApi";

export function useErrorAPI() {
  const [errorsAPI, setErrorsAPI] = useState<ErroApi[]>([] as ErroApi[]);

  const onResetError = useCallback(() => {
    setErrorsAPI([] as ErroApi[]);
  }, []);

  const onReturnMessageError = useCallback(
    (field: string) => {
      if (!errorsAPI.length) return null;

      const error = errorsAPI.filter(
        (c) => c.propertyName.toUpperCase() === field.toUpperCase()
      )[0];

      if (!error) return null;

      return error.errorMessage;
    },
    [errorsAPI]
  );

  const onRemoveRequiredFields = useCallback(
    (fieldName: string, listFieldName: string[]) => {
      if (!fieldName && (!listFieldName || !listFieldName.length)) return;

      setErrorsAPI((prevState) => {
        if (!prevState || !prevState.length) return [];

        const listRemoveFields = listFieldName || [];

        if (fieldName) listRemoveFields.push(fieldName);

        return prevState.filter(
          (x) =>
            !listRemoveFields.some(
              (c) => c.toUpperCase() === x.propertyName.toUpperCase()
            )
        );
      });
    },
    []
  );

  const onAddError = useCallback(
    (propertyName: string, errorMessage: string) => {
      setErrorsAPI(
        (prevState) =>
          [...prevState, { propertyName, errorMessage }] as ErroApi[]
      );
    },
    []
  );

  const onAddListError = useCallback((listError: ErroApi[]) => {
    setErrorsAPI(listError);
  }, []);

  return {
    errorsAPI,
    onResetError,
    onReturnMessageError,
    onRemoveRequiredFields,
    onAddError,
    onAddListError,
  };
}
