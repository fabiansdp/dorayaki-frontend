import { axiosInstance } from "./axios";

export const getShops = async() => {
  try {
    const response = await axiosInstance.get("/shops/");
    return response.data.data;
  } catch (err) {
    return err;
  }
}