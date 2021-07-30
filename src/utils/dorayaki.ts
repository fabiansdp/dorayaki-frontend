import { axiosInstance } from "./axios";
import { CreateDorayaki, UpdateDorayaki, } from "../interfaces/dorayaki"

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
    const {rasa, gambar, deskripsi} = data;
    const formData = new FormData();
    formData.append('file', gambar);
    formData.append('rasa', rasa);
    formData.append('deskripsi', deskripsi);
    const response = await axiosInstance.post(`/dorayakis/`, formData);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

export const updateDorayaki = async(data : UpdateDorayaki, id: string) => {
  try {
    const {rasa, gambar, deskripsi} = data;
    const formData = new FormData();
    
    if (rasa) {formData.append('rasa', rasa);}
    if (deskripsi) {formData.append('deskripsi', deskripsi);}
    if (gambar) {formData.append('file', gambar);}

    const response = await axiosInstance.patch(`/dorayakis/${id}`, formData);
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