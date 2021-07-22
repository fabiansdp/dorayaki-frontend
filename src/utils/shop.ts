import { axiosInstance } from "./axios";
import { ShopUpdate, InventoryUpdate, InventoryAdd, CreateShop, InventoryMove } from "../interfaces/shop";

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

export const createShop = async(data : CreateShop) => {
  try {
    const response = await axiosInstance.post(`/shops/`, data);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

export const updateShop = async(update : ShopUpdate, id: string) => {
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

export const updateInventory = async(update: InventoryUpdate, id: string) => {
  try {
    const response = await axiosInstance.put(`/shops/inventory/${id}`, update)
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

export const addInventory = async(data: InventoryAdd) => {
  try {
    const response = await axiosInstance.post(`/inventory`, data)
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

export const moveInventory = async(data: InventoryMove, id : string) => {
  try {
    const response = await axiosInstance.patch(`/shops/inventory/${id}`, data)
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}