import { CardDados } from "app/main/components/CardDados";
import {
  CheckBox,
  Data,
  DropDownAutoLoad,
  Input,
} from "app/main/components/Core";
import Grid from "app/main/components/Grid";
import { useTranslation } from "react-i18next";

interface IBasicInfoTabProps {
  user: IUser;
  AlteraValorCampo: (
    nomeCampo: string,
    valorCampo: any,
    valoresSpread: any | null
  ) => void;

  AlteraValorCampoPessoa: (
    nomeCampo: string,
    valorCampo: any,
    valoresSpread: any | null
  ) => void;
  inclusao: boolean;
}

function BasicInfoTab({
  user,
  AlteraValorCampo,
  AlteraValorCampoPessoa,
  inclusao,
}: IBasicInfoTabProps) {
  const { t } = useTranslation();

  return (
    <CardDados grid titulo={t("Comum.basicInfo")} icone="edit">
      <Grid container spacing={2} className="flex flex-1 ml-1 mb-2">
        <Grid item md={6} className="mt-12">
          <Input
            onChange={(value) => AlteraValorCampoPessoa("name", value, null)}
            value={user.people?.name}
            required
            label={t("Usuario.nome")}
            id="nome"
          />
        </Grid>
        <Grid item md={6} className="mt-12">
          <Input
            onChange={(value) => AlteraValorCampoPessoa("email", value, null)}
            value={user.people?.email}
            label={t("Usuario.email")}
            id="email"
          />
        </Grid>
        <Grid item md={2}>
          <Input
            onChange={(value) => AlteraValorCampoPessoa("cpf", value, null)}
            value={user.people?.cpf}
            required
            label={t("Usuario.CPF")}
            id="cpf"
            mascara="999.999.999-99"
          />
        </Grid>
        <Grid item md={2}>
          <Input
            onChange={(value) =>
              AlteraValorCampoPessoa("telephone", value, null)
            }
            value={user.people?.telephone}
            label={t("Usuario.telefone")}
            id="telephone"
            mascara="(99) 9999-9999"
          />
        </Grid>
        <Grid item md={2}>
          <Input
            onChange={(value) =>
              AlteraValorCampoPessoa("cellPhone", value, null)
            }
            value={user.people?.cellPhone}
            required
            label={t("Usuario.celular")}
            id="cellPhone"
            mascara="(99) 99999-9999"
          />
        </Grid>
        <Grid item md={2}>
          <Data
            onChange={(value) =>
              AlteraValorCampoPessoa("birthDate", value, null)
            }
            value={user.people?.birthDate}
            label={t("Usuario.dataNascimento")}
          />
        </Grid>
        <Grid item md={2}>
          <DropDownAutoLoad
            label={t("Menu.perfil")}
            grid
            autoBuscar
            value={user.people?.profileId}
            onChange={(value) => {
              if (!Array.isArray(value)) {
                AlteraValorCampoPessoa("profileId", value.id, null);
              }
            }}
            urlAPI={"/api/Profile/DropDown"}
          />
        </Grid>
        <Grid item md={2}>
          <Input
            onChange={(value) => AlteraValorCampoPessoa("crm", value, null)}
            value={user.people?.crm}
            required
            label={t("Usuario.crm")}
            id="crm"
          />
        </Grid>
        {inclusao && (
          <Grid item md={2}>
            <Input
              onChange={(value) => AlteraValorCampo("password", value, null)}
              value={user.password}
              required
              type="password"
              label={t("Login.senha")}
              id="password"
            />
          </Grid>
        )}
        <Grid item md={4}>
          <DropDownAutoLoad
            label={t("Menu.especialidade")}
            grid
            autoBuscar
            multiple={true}
            value={user.people?.specialites}
            onChange={(value) => {
              if (Array.isArray(value)) {
                const selectedValues: (string | number)[] = [];

                value.forEach((item) => {
                  if (typeof item === "object" && "id" in item) {
                    selectedValues.push(item.id);
                  } else {
                    selectedValues.push(item);
                  }
                });

                AlteraValorCampoPessoa("specialites", selectedValues, null);
              }
            }}
            urlAPI={"/api/Speciality/DropDown"}
          />
        </Grid>
        <Grid item md={2}>
          <CheckBox
            onChange={(value) => AlteraValorCampo("isActive", value, null)}
            checked={user.isActive}
            label={t("Usuario.ativo")}
            id="crm"
          />
        </Grid>
      </Grid>
    </CardDados>
  );
}

export default BasicInfoTab;
