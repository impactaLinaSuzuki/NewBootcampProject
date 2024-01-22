import authenticationPagesConfig from "./authentication/authenticationPagesConfig";
import errorPagesConfig from "./error/errorPagesConfig";
import CalendarAppConfig from "./calendar/CalendarAppConfig";
import userConfig from "./administracao/user/userConfig";
import especialidadeConfig from "./administracao/especialidade/especialidadeConfig";
import perfilConfig from "./administracao/perfil/perfilConfig";
import pacienteConfig from "./administracao/paciente/pacienteConfig";

const pagesConfigs = [
  ...authenticationPagesConfig,
  errorPagesConfig,
  CalendarAppConfig,
  userConfig,
  especialidadeConfig,
  perfilConfig,
  pacienteConfig,
];

export default pagesConfigs;
