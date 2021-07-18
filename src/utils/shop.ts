import { axiosInstance } from "./axios";

interface shopUpdate {
  nama?: string;
  jalan?: string;
  kecamatan?: string;
  provinsi?: string;
}

export const getShops = async() => {
  try {
    const response = await axiosInstance.get("/shops/");
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

export const getShop = async(id : string) => {
  try {
    const response = await axiosInstance.get(`/shops/${id}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

export const updateShop = async(update : shopUpdate, id: string) => {
  try {
    const response = await axiosInstance.patch(`/shops/${id}`, update)
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

export const deleteShop = async(id : number) => {
  try {
    const response = await axiosInstance.delete(`/shops/${id}`)
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}