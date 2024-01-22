import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "app/main/hooks/useDebounce";
import { Input, InputProps } from "./Core";

type InputSearchProps = InputProps & {
  delaySearch?: number;
};

export function InputSearch({
  value,
  onChange,
  delaySearch = 800,
  ...rest
}: InputSearchProps) {
  const { t } = useTranslation();

  const [displayValue, setDisplayValue] = useState(value);
  const debouncedChange = useDebounce(onChange, delaySearch);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  function handleChange(newValue: any) {
    debouncedChange(newValue);
    setDisplayValue(newValue);
  }

  return (
    <Input
      onChange={handleChange}
      value={displayValue}
      name="search"
      className="w-full px-4 m-0"
      autoComplete="off"
      placeholder={t("Tabela.filterText")}
      {...rest}
    />
  );
}
