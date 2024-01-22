import { ChangeEvent, useCallback } from "react";
import Grid from "app/main/components/Grid";
import { useTranslation } from "react-i18next";
import { Input, InputCep } from "app/main/components/Core";
import { CardDados } from "app/main/components/CardDados";

interface IAddressTabProps {
  paciente: IPaciente;
  AlteraValorCampo: (
    nomeCampo: string,
    valorCampo: any,
    valoresSpread: any | null
  ) => void;
}

function AddressTab({ paciente, AlteraValorCampo }: IAddressTabProps) {
  const { t } = useTranslation();

  const AlteraValorCampoInput = useCallback(
    (
      valorCampo: any,
      e: ChangeEvent<HTMLInputElement>,
      nomeCampo: string,
      valoresSpread?: any
    ) => {
      AlteraValorCampo(nomeCampo, valorCampo, valoresSpread);
    },
    [AlteraValorCampo]
  );

  return (
    <CardDados grid titulo={t("Comum.addressInfo")} icone="edit">
      <Grid container spacing={2} className="flex flex-1 ml-1 mb-2">
        <Grid item md={2} className="mt-12">
          <InputCep
            label={t("Endereco.cep")}
            name="zipCode"
            value={paciente.zipCode}
            onChange={AlteraValorCampoInput}
            type="number"
            required
            maxLength={8}
          />
        </Grid>
        <Grid item md={6} className="mt-12">
          <Input
            value={paciente.address}
            required
            label={t("Endereco.logradouro")}
            onChange={(value) => AlteraValorCampo("address", value, null)}
            id="address"
          />
        </Grid>
        <Grid item md={2} className="mt-12">
          <Input
            value={paciente.number}
            required
            label={t("Endereco.numero")}
            onChange={(value) => AlteraValorCampo("number", value, null)}
            id="number"
          />
        </Grid>
        <Grid item md={2} className="mt-12">
          <Input
            value={paciente.complement}
            label={t("Endereco.complemento")}
            onChange={(value) => AlteraValorCampo("complement", value, null)}
            id="complement"
          />
        </Grid>
        <Grid item md={5}>
          <Input
            value={paciente.district}
            required
            label={t("Endereco.bairro")}
            onChange={(value) => AlteraValorCampo("district", value, null)}
            id="district"
          />
        </Grid>
        <Grid item md={5}>
          <Input
            value={paciente.city}
            required
            label={t("Endereco.cidade")}
            onChange={(value) => AlteraValorCampo("city", value, null)}
            id="city"
          />
        </Grid>
        <Grid item md={2}>
          <Input
            value={paciente.state}
            required
            label={t("Endereco.estado")}
            onChange={(value) => AlteraValorCampo("state", value, null)}
            id="state"
            maxLength={2}
          />
        </Grid>
      </Grid>
    </CardDados>
  );
}

export default AddressTab;
