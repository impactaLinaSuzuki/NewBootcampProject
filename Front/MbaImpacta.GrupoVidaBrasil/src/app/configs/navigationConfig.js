import authRoles from "../auth/authRoles";

const navigationConfig = [
  {
    id: "divider-1",
    type: "divider",
  },
  {
    id: "menuNavegacao",
    title: "MENU DE NAVEGAÇÃO",
    type: "group",
    translate: "NAVIGATION MENU",
    children: [
      {
        id: "menuNavegacao.calendar",
        title: "Calendário",
        type: "item",
        icon: "heroicons-outline:calendar",
        url: "/apps/calendar",
      },
      {
        id: "menuNavegacao.administracao",
        title: "Administração",
        type: "collapse",
        icon: "heroicons-outline:briefcase",
        children: [
          {
            id: "menuNavegacao.administracao.usuarios",
            title: "Usuários",
            type: "item",
            url: "/CADASTROS/USUARIO",
          },
          {
            id: "menuNavegacao.administracao.perfil",
            title: "Perfil",
            type: "item",
            url: "/CADASTROS/PERFIL",
          },
          {
            id: "menuNavegacao.administracao.especialidade",
            title: "Especialidade",
            type: "item",
            url: "/CADASTROS/ESPECIALIDADE",
          },
          {
            id: "menuNavegacao.administracao.paciente",
            title: "Paciente",
            type: "item",
            url: "/CADASTROS/PACIENTE",
          },
        ],
      },
    ],
  },
  {
    id: "divider-2",
    type: "divider",
  },
  {
    id: "auth",
    type: "group",
    children: [
      {
        id: "sign-out",
        title: "Sign out",
        type: "item",
        auth: authRoles.user,
        url: "sign-out",
        icon: "exit_to_app",
      },
    ],
  },
];

export default navigationConfig;
