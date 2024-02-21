'use client';

import Image from 'next/image';
import { ChangeEvent, Fragment, useState } from 'react';
import { BsTrash3 } from 'react-icons/bs';
import CardItem from '~/components/CartItem';
import ModalWarehouse from '~/components/ModalWarehouse';
import WarehouseItem from '~/components/WarehouseItem';
import { removeAllCart, selectAllItem } from '~/lib/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '~/lib/hooks';

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const cartSelector = useAppSelector(state => state.cart);
  const warehouseSelector = useAppSelector(state => state.warehouse);
  const dispatch = useAppDispatch();

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(selectAllItem(e.target.checked));
  };

  const handleDeleteAllItem = () => {
    if (confirm('Keranjang akan dikosongkan')) {
      dispatch(removeAllCart());
    }
  };

  const getTotalWeight = () =>
    cartSelector
      .filter(item => item.isSelected)
      .map(item => item.total_berat * item.kuantitas)
      .concat(warehouseSelector.map(item => item.total_berat))
      .reduce((total, item) => total + item, 0);

  const getItemPrice = () =>
    cartSelector
      .filter(item => item.isSelected)
      .map(item => item.harga_barang * item.kuantitas)
      .concat(warehouseSelector.map(item => item.total_harga))
      .reduce((total, item) => total + item, 0);

  const isAllSelected = cartSelector.length > 0 && cartSelector.every(cartItem => cartItem.isSelected);

  const totalBerat = getTotalWeight();
  const estimasiBiayaKirim = getTotalWeight() * 8500;
  const totalHarga = getItemPrice() + estimasiBiayaKirim;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto p-5">
        <h1 className="text-2xl font-bold">Keranjang</h1>

        <div className="flex gap-10 justify-between mt-7">
          <div className="w-2/3 flex flex-col">
            {cartSelector.length == 0 ? (
              <div className="flex justify-center items-center flex-col">
                <Image src="/EmptyCart.svg" width={400} height={0} alt="Empty Cart" />
                <p className="mt-5">Keranjang masih kosong, silahkan pilih produk terlebih dahulu.</p>
              </div>
            ) : (
              <>
                <div className="  bg-white rounded-lg h-fit">
                  <div className="p-5">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex gap-2 items-center p-2">
                        <input
                          type="checkbox"
                          id="pilih-semua"
                          className="w-5 h-5"
                          onChange={handleCheckboxChange}
                          checked={isAllSelected}
                        />
                        <label htmlFor="pilih-semua" className="font-bold">
                          Pilih Semua{' '}
                          <span className="text-gray-500">
                            {'('}
                            {cartSelector.length}
                            {')'}
                          </span>
                        </label>
                      </div>
                      <button
                        className="flex items-center gap-2 hover:bg-red-50 py-1 px-2 rounded-lg"
                        onClick={handleDeleteAllItem}
                      >
                        <BsTrash3 color="red" size={16} />
                        <p className="text-red-500 font-semibold">Hapus Semua</p>
                      </button>
                    </div>
                  </div>

                  {/* Cart Product */}
                  {cartSelector?.map((item, idx) => (
                    <Fragment key={idx}>
                      <hr className="border-4 border-slate-100" />
                      <CardItem product={item} idx={idx} />
                    </Fragment>
                  ))}
                </div>

                {warehouseSelector.length > 0 && (
                  <div className="flex flex-col bg-white rounded-lg h-fit mt-10 mb-52">
                    {/* Warehouse */}
                    <div className="p-5 flex gap-2 items-start w-full">
                      <div className="flex gap-5 w-full">
                        <h2 className="text-xl font-semibold">Kirim Barang ke Warehouse Master Bagasi</h2>
                      </div>
                    </div>
                    {warehouseSelector?.map((item, idx) => (
                      <Fragment key={idx}>
                        <hr className="border-4 border-slate-100" />
                        <WarehouseItem product={item} idx={idx} />
                      </Fragment>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="w-1/3 flex gap-5 flex-col">
            <div className="bg-white rounded-md p-5">
              <h3 className="text-lg font-semibold mb-3">Ringkasan belanja</h3>

              <div className="flex justify-between">
                <p className="text-gray-500">Keranjang yang dipilih</p>
                <p>{cartSelector.filter(item => item.isSelected).length} Item</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Werehouse yang dipilih</p>
                <p>{warehouseSelector.length} Item</p>
              </div>

              <div className="flex justify-between mt-3">
                <p className="text-gray-500">Estimasi berat belanjaan</p>
                <p>{totalBerat} kg</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">
                  Estimasi biaya kiriman <span className="block text-sm">Rp 8,500/kg</span>
                </p>
                <p>Rp {estimasiBiayaKirim.toLocaleString('en-ID')}</p>
              </div>
              <div className="flex justify-between mt-5">
                <p className="text-gray-500">Total</p>
                <p className="font-semibold">Rp {totalHarga.toLocaleString('en-ID')}</p>
              </div>
              <hr className="my-4" />

              <button className="bg-[#ff4200] font-semibold text-white py-2 w-full mt-3">
                Checkout {'('}
                {cartSelector.map(item => item.isSelected).length + warehouseSelector.length}
                {')'}
              </button>
            </div>

            <div className="bg-white rounded-md p-5">
              <h3 className="text-lg font-semibold">Kirim Barang ke Warehouse</h3>
              <button
                className="text-[#ff4200] transition-colors border border-[#ff440017] hover:bg-[#ff440017] font-semibold  py-2 w-full mt-3"
                onClick={() => setIsOpenModal(true)}
              >
                Tambah Pengiriman Barang Pribadi
              </button>
            </div>
            {isOpenModal && <ModalWarehouse setIsOpenModal={setIsOpenModal} />}
          </div>
        </div>
      </div>
    </div>
  );
}
