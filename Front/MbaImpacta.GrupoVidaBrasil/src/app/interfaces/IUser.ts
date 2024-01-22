interface IUser {
  id?: number;
  isActive: boolean;
  password: string;
  token: string;
  peoleId: number;
  people: IPeople;
}
