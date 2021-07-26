interface Dorayaki {
  id: number;
  rasa: string;
  deskripsi: string;
  gambar: string;
}

interface CreateDorayaki {
  rasa: string;
  deskripsi: string;
  gambar: File;
}