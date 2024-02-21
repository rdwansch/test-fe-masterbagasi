import Image from 'next/image';
import { BsDash, BsPlus, BsTrash3 } from 'react-icons/bs';
import { CartItem } from '~/interfaces/Product';
import { addToCart, substractFromCart, removeItemFromCart, selectItem } from '~/lib/features/cart/cartSlice';
import { useAppDispatch } from '~/lib/hooks';

export default function CartItem({ product, idx }: { product: CartItem; idx: number }) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleSubstractFromCart = () => {
    dispatch(substractFromCart(product));
  };

  const handleremoveItemFromCart = () => {
    dispatch(removeItemFromCart(idx));
  };

  const handleSelectItem = () => {
    dispatch(selectItem(idx));
  };

  return (
    <div className=" p-5 flex gap-2 items-start w-full">
      <input type="checkbox" className="w-5 h-5" onChange={handleSelectItem} checked={product.isSelected} />
      <div className="flex gap-5 w-full">
        <div className="border rounded bg-gray-50">
          <Image src={product.foto} alt={product.nama} width={100} height={0} />
        </div>
        <div className="w-full">
          <h3 className="text-gray-600">{product.nama}</h3>
          <p className="text-orange-500 font-bold text-lg">Rp {product.harga_barang.toLocaleString('en-ID')}</p>
          <h3 className="text-gray-600">
            {product.jumlah_barang}pcs x {product.berat_barang}gram | {product.total_berat}Kg
          </h3>

          <div className="justify-end flex gap-5 items-center w-full">
            <button onClick={handleremoveItemFromCart}>
              <BsTrash3 color="gray" size={16} />
            </button>
            <div className="flex gap-5 border items-center rounded-lg">
              <button className="p-2 hover:bg-gray-100 transition" onClick={handleSubstractFromCart}>
                <BsDash color="gray" />
              </button>
              <span>{product.kuantitas}</span>
              <button className="p-2 hover:bg-gray-100 transition" onClick={handleAddToCart}>
                <BsPlus color="gray" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
