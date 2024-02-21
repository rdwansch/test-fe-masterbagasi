'use client';

import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Warehouse } from '~/interfaces/Product';
import { addToWarehouse } from '~/lib/features/warehouse/warehouseSlice';
import { useAppDispatch } from '~/lib/hooks';

export default function ModalWarehouse({ setIsOpenModal }: { setIsOpenModal: Dispatch<SetStateAction<boolean>> }) {
  const dispatch = useAppDispatch();
  const [warehouseProduct, setWarehouseProduct] = useState<Warehouse>({
    nama: '',
    foto: '/EmptyProduct.png',
    berat_barang: 1,
    harga_barang: 1,
    jumlah_barang: 1,
    total_berat: 1,
    total_harga: 1,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWarehouseProduct(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveWarehouse = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addToWarehouse(warehouseProduct));
    setIsOpenModal(false);
  };

  useEffect(() => {
    setWarehouseProduct(prev => ({ ...prev, total_berat: (prev.jumlah_barang * prev.berat_barang) / 1000 }));
  }, [warehouseProduct.jumlah_barang, warehouseProduct.berat_barang]);

  useEffect(() => {
    setWarehouseProduct(prev => ({ ...prev, total_harga: prev.jumlah_barang * prev.harga_barang }));
  }, [warehouseProduct.jumlah_barang, warehouseProduct.harga_barang]);

  return createPortal(
    <>
      <div
        className="fixed z-10 top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)]"
        onClick={() => setIsOpenModal(false)}
      ></div>
      <div className="fixed mx-auto left-0 right-0 top-52 bg-white max-w-5xl p-5 z-20">
        <h2 className="text-xl font-semibold">Tambah Barang untuk dikirim ke Warehouse</h2>

        <form onSubmit={handleSaveWarehouse}>
          <div className="grid grid-cols-4 row-end-2 gap-5 mt-5">
            <div className="col-span-2 flex flex-col gap-2">
              <label htmlFor="name">Nama</label>
              <input
                type="text"
                id="name"
                name="nama"
                placeholder="Masukkan nama barang"
                className="outline-none px-4 py-2 border-2 rounded-lg  focus:border-blue-500 transition"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <label htmlFor="harga-barang">Harga barang / pcs</label>
              <input
                type="text"
                id="harga-barang"
                name="harga_barang"
                placeholder="Masukkan harga barang"
                className="outline-none px-4 py-2 border-2 rounded-lg  focus:border-blue-500 transition"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <label htmlFor="berat-barang">Berat barang / pcs</label>
              <input
                type="text"
                id="berat-barang"
                name="berat_barang"
                placeholder="Masukkan berat barang"
                className="outline-none px-4 py-2 border-2 rounded-lg  focus:border-blue-500 transition"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <label htmlFor="jumlah-barang">Jumlah barang </label>
              <input
                type="text"
                id="jumlah-barang"
                name="jumlah_barang"
                placeholder="Masukkan jumlah barang"
                className="outline-none px-4 py-2 border-2 rounded-lg  focus:border-blue-500 transition"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <label htmlFor="total-berat-barang">Total Berat barang / kg</label>
              <input
                type="text"
                id="total-berat-barang"
                disabled
                value={warehouseProduct.total_berat}
                className="cursor-not-allowed outline-none px-4 py-2 border-2 rounded-lg  focus:border-blue-500 transition"
              />
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <label htmlFor="total-harga">Total Harga</label>
              <input
                type="text"
                id="total-harga"
                disabled
                value={warehouseProduct.total_harga.toLocaleString('en-ID')}
                className="cursor-not-allowed outline-none px-4 py-2 border-2 rounded-lg  focus:border-blue-500 transition"
              />
            </div>
          </div>
          <hr className="border-2 my-5" />
          <div className="flex gap-3 justify-end">
            <button className="bg-[#ff4200] font-semibold text-white py-2 px-5 rounded-lg" type="submit">
              Simpan
            </button>
            <button
              className="font-semibold py-2 px-5 hover:bg-gray-200 rounded-lg text-gray-600 transition"
              type="button"
              onClick={() => setIsOpenModal(false)}
            >
              Tutup
            </button>
          </div>
        </form>
      </div>
    </>,
    document.body
  );
}
