'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BsCart2 } from 'react-icons/bs';
import { useAppSelector } from '~/lib/hooks';

export default function Nav() {
  const cartSelector = useAppSelector(state => state.cart);

  return (
    <nav className="border-b shadow-sm">
      <div className="flex justify-between my-container">
        <Link href="/">
          <Image src={'/vercel.svg'} alt="Vercel" width={100} height={50} />
        </Link>

        <Link href="/cart">
          <div className="relative">
            {cartSelector.length > 0 && (
              <span className="absolute border-4 border-white bg-[#ff4200] text-white font-semibold -top-3 -right-3 rounded-full w-7 h-7 flex justify-center items-center text-sm">
                {cartSelector.length}
              </span>
            )}

            <BsCart2 size={28} color="gray" />
          </div>
        </Link>
      </div>
    </nav>
  );
}
