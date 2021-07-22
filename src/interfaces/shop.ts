export interface ShopInfo {
  id: number;
  nama: string;
  jalan: string;
  kecamatan: string;
  provinsi: string;
  created_at: string;
  updated_at: string;
}

export interface CreateShop {
  nama: string;
  jalan: string;
  kecamatan: string;
  provinsi: string;
}

export interface ShopInventory {
  id: number;
  rasa: string;
  deskripsi: string;
  gambar: string;
  quantity: number;
}

export interface ShopUpdate {
  nama?: string;
  jalan?: string;
  kecamatan?: string;
  provinsi?: string;
}

export interface InventoryAdd {
  dorayaki_id: number;
  shop_id: number;
  quantity: number;
}

export interface InventoryUpdate {
  dorayaki_id: number;
  quantity: number;
}

export interface InventoryMove {
  dorayaki_id: number;
  recipient_id: number;
  quantity: number;
}