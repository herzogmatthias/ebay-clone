export default interface IProduct {
  name: string;
  description: string;
  price: number;
  image: string;
  startDate: string;
  endDate: string;
  email?: string;
  latestPrice?: number;
}
