"use client";

import { useCart } from "./CartProvider";

export default function Toast() {
  const { toast } = useCart();
  return <div className={"toast" + (toast ? " show" : "")}>{toast}</div>;
}
