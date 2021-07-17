interface ShopInfo {
  id: number;
  nama: string;
  jalan: string;
  kecamatan: string;
  provinsi: string;
  created_at: string;
  updated_at: string;
}

interface ShopInventory {
  id: number;
  rasa: string;
  deskripsi: string;
  gambar: string;
  quantity: number;
}