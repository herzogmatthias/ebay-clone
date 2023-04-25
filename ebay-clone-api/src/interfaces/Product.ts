export default interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  startDate: Date;
  endDate: Date;
  email?: string;
}
