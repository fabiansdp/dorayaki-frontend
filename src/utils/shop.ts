import { axiosInstance } from "./axios";

export const getShops = async() => {
  try {
    const response = await axiosInstance.get("/shops/");
    return response.data.data;
  } catch (err) {
    return err;
  }
}

export const deleteShop = async(id : number) => {
  try {
    const response = await axiosInstance.delete(`/shops/${id}`)
    return response.data;
  } catch (err) {
    return err;
  }
}