"use client";

import { useForm } from "react-hook-form";
import ProductForm from "./components/ProductForm";
export default function Home() {
  const { register, watch } = useForm();
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Add New Product
      </h1>

      <ProductForm />
    </div>
  );
}
