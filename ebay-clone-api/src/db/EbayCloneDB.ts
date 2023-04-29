import { get } from "http";
import Bid from "../interfaces/Bid";
import Product from "../interfaces/Product";
import UserModel from "../models/User.model";
import crypto from "crypto";

export const findUser = async (email: string, password: string) => {
  try {
    const users = await UserModel.find();
    console.log(users);
    const user = await UserModel.findOne({ email: email, password: password });
    return user;
  } catch (error: any) {
    return error;
  }
};

export const insertUser = async (email: string, password: string) => {
  await UserModel.create({ email: email, password: password, bids: [] });
};

export const insertProductForUser = async (
  name: string,
  description: string,
  price: number,
  image: string,
  startDate: Date,
  endDate: Date,
  email: string
) => {
  const user = await UserModel.findOne({ email: email });
  console.log(user);
  if (user?.products.find((product) => product.name === name)) {
    throw new Error("Product already exists");
  }
  user?.products.push({
    name: name,
    description: description,
    price: price,
    image: image,
    startDate: startDate,
    endDate: endDate,
  });
  await user?.save();
  return user?.products[user?.products.length - 1];
};

export const getAllProducts = async () => {
  const users = await UserModel.find();
  const products = users.map((user) =>
    user.products.map((product) => {
      return { ...product, email: user.email };
    })
  );
  return products.flat(1);
};

export const getProductByName = async (
  name: string,
  email: string
): Promise<Product> => {
  const user = await UserModel.findOne({ email: email });
  const product = user?.products.filter((product) => product.name === name)[0];
  product.email = email;
  return product;
};

export const deleteProductByName = async (name: string, email: string) => {
  const users = await UserModel.find();
  const user = await UserModel.findOne({ email: email });
  user?.products.filter((product) => product.name !== name);
  users.forEach((user) => {
    user.bids.filter((bid) => bid.productName !== name);
  });
  users.forEach((user) => {
    user.save();
  });
  await user?.save();
};

export const addBid = async (
  productName: string,
  email: string,
  price: number,
  supplierEmail: string,
  date: Date
) => {
  const product = await getProductByName(productName, supplierEmail);
  const lastPrice = await getLastPriceForProduct(productName, supplierEmail);
  if (new Date(product.startDate) > date || new Date(product.endDate) < date) {
    throw new Error("Date is not in range");
  }
  if (product.price >= price || lastPrice >= price) {
    throw new Error("Price is not higher than current price");
  }
  if (product.email === email) {
    throw new Error("You can't bid on your own product");
  }
  const id = crypto
    .createHash("sha256")
    .update(email + productName + price + date.getTime(), "utf-8")
    .digest("hex");
  const user = await UserModel.findOne({ email: email });
  user?.bids.push({
    id: id,
    productName: productName,
    supplierEmail: supplierEmail,
    price: price,
    date: date,
  });

  await user?.save();
  return { ...user?.bids[user?.bids.length - 1], email: email };
};

const getAllBids = async (): Promise<Bid[]> => {
  const users = await UserModel.find();
  const bids = users.map((user) =>
    user.bids.map((bid) => {
      return { ...bid, email: user.email };
    })
  );
  return bids.flat(1);
};

export const getAllBidsForProduct = async (
  supplierEmail: string,
  productName: string
) => {
  console.log(supplierEmail, productName);
  const bids = await getAllBids();
  console.log(bids);
  console.log(bids.filter((bid) => bid.productName == productName));
  return bids
    .filter((bid) => {
      return (
        bid.productName == productName && bid.supplierEmail == supplierEmail
      );
    })
    .sort((a, b) => a.price - b.price);
};

export const deleteBidByID = async (id: string, email: string) => {
  const user = await UserModel.findOne({ email: email });
  user?.bids.filter((bid) => bid.id !== id);
  await user?.save();
};

export const getLastPriceForProduct = async (
  productName: string,
  supplierEmail: string
) => {
  const bids = await getAllBidsForProduct(supplierEmail, productName);
  const lastBid = bids.sort((a, b) => a.price - b.price)[bids.length - 1];
  return lastBid ? lastBid.price : 0;
};
