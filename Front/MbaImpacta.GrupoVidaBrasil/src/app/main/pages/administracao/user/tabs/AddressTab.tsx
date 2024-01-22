import { ChangeEvent, useCallback } from "react";
import Grid from "app/main/components/Grid";
import { useTranslation } from "react-i18next";
import { Input, InputCep } from "app/main/components/Core";
import { CardDados } from "app/main/components/CardDados";

interface IAddressTabProps {
  user: IUser;
  AlteraValorCampoPessoa: (
    nomeCampo: string,
    valorCampo: any,
    valoresSpread: any | null
  ) => void;
}

function AddressTab({ user, AlteraValorCampoPessoa }: IAddressTabProps) {
  const { t } = useTranslation();

  const AlteraValorCampoInput = useCallback(
    (
      valorCampo: any,
      e: ChangeEvent<HTMLInputElement>,
      nomeCampo: string,
      valoresSpread?: any
    ) => {
      AlteraValorCampoPessoa(nomeCampo, valorCampo, valoresSpread);
    },
    [AlteraValorCampoPessoa]
  );

  return (
    <CardDados grid titulo={t("Comum.addressInfo")} icone="edit">
      <Grid container spacing={2} className="flex flex-1 ml-1 mb-2">
        <Grid item md={2} className="mt-12">
          <InputCep
            label={t("Endereco.cep")}
            name="zipCode"
            value={user.people?.zipCode}
            onChange={AlteraValorCampoInput}
            type="number"
            required
            maxLength={8}
          />
        </Grid>
        <Grid item md={6} className="mt-12">
          <Input
            value={user.people?.address}
            required
            label={t("Endereco.logradouro")}
            onChange={(value) => AlteraValorCampoPessoa("address", value, null)}
            id="address"
          />
        </Grid>
        <Grid item md={2} className="mt-12">
          <Input
            value={user.people?.number}
            required
            label={t("Endereco.numero")}
            onChange={(value) => AlteraValorCampoPessoa("number", value, null)}
            id="number"
          />
        </Grid>
        <Grid item md={2} className="mt-12">
          <Input
            value={user.people?.complement}
            label={t("Endereco.complemento")}
            onChange={(value) =>
              AlteraValorCampoPessoa("complement", value, null)
            }
            id="complement"
          />
        </Grid>
        <Grid item md={5}>
          <Input
            value={user.people?.district}
            required
            label={t("Endereco.bairro")}
            onChange={(value) =>
              AlteraValorCampoPessoa("district", value, null)
            }
            id="district"
          />
        </Grid>
        <Grid item md={5}>
          <Input
            value={user.people?.city}
            required
            label={t("Endereco.cidade")}
            onChange={(value) => AlteraValorCampoPessoa("city", value, null)}
            id="city"
          />
        </Grid>
        <Grid item md={2}>
          <Input
            value={user.people?.state}
            required
            label={t("Endereco.estado")}
            onChange={(value) => AlteraValorCampoPessoa("state", value, null)}
            id="state"
            maxLength={2}
          />
        </Grid>
      </Grid>
    </CardDados>
  );
}

export default AddressTab;
