import { axiosInstance } from "./axios";

export const getDorayakis = async() => {
  try {
    const response = await axiosInstance.get("/dorayakis/");
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

export const getDorayaki = async(id : string) => {
  try {
    const response = await axiosInstance.get(`/dorayakis/${id}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

export const createDorayaki = async(data : CreateDorayaki) => {
  try {
    const response = await axiosInstance.post(`/dorayakis/`, data);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

export const deleteDorayaki = async(id: number) => {
  try {
    const response = await axiosInstance.delete(`/dorayakis/${id}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}