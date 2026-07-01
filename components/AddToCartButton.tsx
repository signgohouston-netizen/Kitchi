"use client";

import { useCart } from "./CartProvider";

type Props = {
  name: string;
  price: number;
  emoji?: string;
  className?: string;
  children: React.ReactNode;
};

export default function AddToCartButton({ name, price, emoji, className, children }: Props) {
  const { add } = useCart();
  return (
    <button
      type="button"
      className={className}
      onClick={() => add({ name, price, emoji })}
    >
      {children}
    </button>
  );
}
