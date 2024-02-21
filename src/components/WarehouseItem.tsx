import Image from 'next/image';
import { BsTrash3 } from 'react-icons/bs';
import { Warehouse } from '~/interfaces/Product';
import { removeItemFromWarehouse } from '~/lib/features/warehouse/warehouseSlice';
import { useAppDispatch } from '~/lib/hooks';

export default function WarehouseItem({ product, idx }: { product: Warehouse; idx: number }) {
  const dispatch = useAppDispatch();

  const handleremoveItemFromCart = () => {
    dispatch(removeItemFromWarehouse(idx));
  };

  return (
    <div className="p-5 flex gap-2 items-start w-full">
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
              <BsTrash3 color="red" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
