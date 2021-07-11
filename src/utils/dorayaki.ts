import { axiosInstance } from "./axios";

export const getDorayakis = async() => {
  try {
    const response = await axiosInstance.get("/dorayakis/");
    return response.data.data;
  } catch (err) {
    console.log(err)
  }
}