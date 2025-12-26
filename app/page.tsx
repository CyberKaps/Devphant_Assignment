"use client";

import { useForm } from "react-hook-form";
import ProductForm from "./components/ProductForm";
export default function Home() {
  return (
    <div className="mx-auto max-w-[1100px] px-6 py-4">
      

      <ProductForm />
    </div>
  );
}
