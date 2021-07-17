import { axiosInstance } from "./axios";

export const getShops = async() => {
  try {
    const response = await axiosInstance.get("/shops/");
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export const getShop = async(id : string) => {
  try {
    const response = await axiosInstance.get(`/shops/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export const deleteShop = async(id : number) => {
  try {
    const response = await axiosInstance.delete(`/shops/${id}`)
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}