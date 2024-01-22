interface IPeople {
  id?: number;
  name: string;
  cpf: string;
  crm: string;
  email: string;
  cellPhone: string;
  telephone: string;
  address: string;
  city: string;
  complement: string;
  district: string;
  number: string;
  state: string;
  zipCode: string;
  country: string;
  birthDate: Date;
  profileId: number;
  profile: IPerfil;
  specialites: number[];
}
