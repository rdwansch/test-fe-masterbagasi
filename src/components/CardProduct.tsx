'use client';

import Image from 'next/image';
import { BsPlus } from 'react-icons/bs';
import { Product } from '~/interfaces/Product';
import { addToCart } from '~/lib/features/cart/cartSlice';
import { useAppDispatch } from '~/lib/hooks';

export default function CardProduct({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <div className="w-48 shadow">
        <div className="w-48 h-40 bg-white">
          <Image src={product.foto} width={100} height={100} alt="Kapal APi" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="flex justify-between items-start p-3">
          <div>
            <h2 className="text-xl text-gray-600">{product.nama}</h2>
            <p className="font-bold text-orange-500">Rp. {product.harga_barang.toLocaleString('en-ID')}</p>
          </div>
          <div className="mt-2  w-5 h-5 border border-gray-400 flex items-center justify-center rounded-full">
            <button onClick={handleAddToCart}>
              <BsPlus />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
