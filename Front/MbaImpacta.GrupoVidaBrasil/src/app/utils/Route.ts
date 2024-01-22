import history from "@history";

export function GetBasename(): string {
  let baseName = "";
  if (!(process.env.NODE_ENV === "development")) {
    baseName = process.env.PUBLIC_URL || ""; // Utilizado para V3 que é um subApplication do V2
  }

  return baseName;
}

export function GetLinkBasePortal(): string {
  const urlBase = `${window.location.origin}${GetBasename()}`;

  return urlBase;
}

export function GetPathImage(): string {
  return `${GetBasename()}/assets/images/`;
}

export function RouteWithBasename(route: string): string {
  return `${GetBasename()}${route}`;
}

export function NavigateToRoute(route: string): void {
  history.push(RouteWithBasename(route));
}

export function NavigateToSameRoute(route: string): void {
  window.location.replace(`${GetLinkBasePortal()}${route}`);
}

export function GetPathname(): string {
  const basename = GetBasename();
  const { pathname } = window.location;
  let pathTreated = pathname;

  if (!!basename && pathname.toUpperCase().startsWith(basename.toUpperCase())) {
    pathTreated = `/${pathname.substring(basename.length + 1)}`;
  }

  return pathTreated;
}
