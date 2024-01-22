import { resetSettings } from "app/store/fuse/settingsSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function AtualizaConfiguracoes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetSettings());
  }, []);

  return null;
}
