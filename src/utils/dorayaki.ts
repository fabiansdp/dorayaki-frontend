import { axiosInstance } from "./axios";

export const getDorayakis = async() => {
  try {
    const response = await axiosInstance.get("/dorayakis/");
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export const deleteDorayaki = async(id: number) => {
  try {
    const response = await axiosInstance.delete(`/dorayakis/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}