export interface Product {
  nama: string;
  foto: string;
  harga_barang: number;
  berat_barang: number;
  jumlah_barang: number;
  total_berat: number;
  total_harga: number;
}

export interface CartItem extends Product {
  kuantitas: number;
  isSelected: boolean;
}

export interface Warehouse extends Product {}
