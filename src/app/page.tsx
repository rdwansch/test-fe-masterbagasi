import CardProduct from '~/components/CardProduct';
import { Product } from '~/interfaces/Product';

const getData = async () => {
  const res = await fetch('http://localhost:3000/data.json');
  const data = await res.json();
  return data.data;
};

export default async function page() {
  const products: Product[] = await getData();

  return (
    <div className="my-container">
      <div className="absolute top-[68px] left-0 right-0 bg-blue-500 w-[90%] mx-auto h-52 -z-10 rounded-b-lg"></div>
      <h1 className="text-4xl font-semibold text-white">Produk Indonesia</h1>

      <div className="mt-10 flex gap-16 flex-wrap">
        {products.map((item, idx) => (
          <CardProduct key={idx} product={item} />
        ))}
      </div>
    </div>
  );
}
