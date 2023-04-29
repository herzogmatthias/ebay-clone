export default interface Bid {
  id?: string;
  productName: string;
  supplierEmail: string;
  price: number;
  date: Date;
  email?: string;
}
