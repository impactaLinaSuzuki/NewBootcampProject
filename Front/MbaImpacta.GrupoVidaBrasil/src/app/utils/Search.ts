import Fuse from "fuse.js";
import { RemoveCaracterEspecial } from "./Utils";
import { ObjectKeys } from "app/interfaces/ObjectKeys";

// Site documentação -> https://fusejs.io/
export function executeSearch(
  listSearch: unknown[],
  keysSearch: string[],
  search: any,
  options = {}
): unknown[] {
  const newFuseSearch = new Fuse(listSearch, {
    keys: keysSearch, // Array de string das colunas
    ignoreLocation: true, // Define que a string possa conter em qualquer lugar do texto
    shouldSort: false, // Define que não realize a ordenação pela pontuação
    threshold: 0.0, // Redefine que a busca deva conter exatamente a palavra encontrada
    getFn: (obj: unknown, path: any) => {
      // Use the default `get` function
      const objTreated = obj as ObjectKeys;

      const value =
        typeof objTreated[path] === "string"
          ? RemoveCaracterEspecial(objTreated[path])
          : Fuse.config.getFn(objTreated, path);
      // ... do something with `value`

      return value;
    },
    ...options,
  });

  // search pode ser uma string ou um objeto com os operadores de and/Or com varias colunas
  // Componente de tabela implementa bem um exemplo

  if (typeof search === "object") {
    Object.keys(search).forEach((key: string) => {
      search[key].forEach((item: any, i: number) => {
        Object.keys(item).forEach((value) => {
          search[key][i][value] = RemoveCaracterEspecial(search[key][i][value]);
        });
      });
    });
  } else if (typeof search === "string") {
    search = RemoveCaracterEspecial(search);
  }

  return newFuseSearch.search(search).map((result: any) => result.item);
}
