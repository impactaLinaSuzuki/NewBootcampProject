import { CardDados } from "app/main/components/CardDados";
import { CheckBox, Data, Input } from "app/main/components/Core";
import Grid from "app/main/components/Grid";
import { useTranslation } from "react-i18next";

interface IBasicInfoTabProps {
  paciente: IPaciente;
  AlteraValorCampo: (
    nomeCampo: string,
    valorCampo: any,
    valoresSpread: any | null
  ) => void;
}

function BasicInfoTab({ paciente, AlteraValorCampo }: IBasicInfoTabProps) {
  const { t } = useTranslation();
  return (
    <CardDados grid titulo={t("Comum.basicInfo")} icone="edit">
      <Grid container spacing={2} className="flex flex-1 ml-1 mb-2">
        <Grid item md={6} className="mt-12">
          <Input
            onChange={(value) => AlteraValorCampo("name", value, null)}
            value={paciente.name}
            required
            label={t("Usuario.nome")}
            id="name"
          />
        </Grid>
        <Grid item md={6} className="mt-12">
          <Input
            onChange={(value) => AlteraValorCampo("email", value, null)}
            value={paciente.email}
            label={t("Usuario.email")}
            id="email"
          />
        </Grid>
        <Grid item md={2}>
          <Input
            onChange={(value) => AlteraValorCampo("cpf", value, null)}
            value={paciente.cpf}
            required
            label={t("Usuario.CPF")}
            id="cpf"
            mascara="999.999.999-99"
          />
        </Grid>
        <Grid item md={2}>
          <Input
            onChange={(value) => AlteraValorCampo("telephone", value, null)}
            value={paciente.telephone}
            label={t("Usuario.telefone")}
            id="telephone"
            mascara="(99) 9999-9999"
          />
        </Grid>
        <Grid item md={2}>
          <Input
            onChange={(value) => AlteraValorCampo("cellPhone", value, null)}
            value={paciente.cellPhone}
            required
            label={t("Usuario.celular")}
            id="cellPhone"
            mascara="(99) 99999-9999"
          />
        </Grid>
        <Grid item md={2}>
          <Data
            onChange={(value) => AlteraValorCampo("birthDate", value, null)}
            value={paciente.birthDate}
            label={t("Usuario.dataNascimento")}
          />
        </Grid>
      </Grid>
    </CardDados>
  );
}

export default BasicInfoTab;
