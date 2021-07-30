export interface Dorayaki {
  id: number;
  rasa: string;
  deskripsi: string;
  gambar: string;
}

export interface CreateDorayaki {
  rasa: string;
  deskripsi: string;
  gambar: File;
}

export interface UpdateDorayaki {
  rasa?: string;
  deskripsi?: string;
  gambar?: File;
}