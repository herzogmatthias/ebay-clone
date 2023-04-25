import UserModel from "../models/User.model";

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

export const getProductByName = async (name: string, email: string) => {
  const user = await UserModel.findOne({ email: email });
  return user?.products.filter((product) => product.name === name)[0];
};
