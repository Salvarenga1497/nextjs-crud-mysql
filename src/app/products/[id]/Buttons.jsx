"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

function Buttons({ productId }) {
  const router = useRouter();
  return (
    <div className="flex gap-x-2 justify-end mt-2">
      <button
        className="bg-red-500 hover:bg-red-700 py-2 px-3 rounded text-white"
        onClick={async () => {
          if (confirm("¿Estas seguro que quieres eliminar este producto?")) {
            const res = await axios.delete("/api/products/" + productId);
            if (res.status == 204) {
              router.push("/products");
              router.refresh();
            }
          }
        }}
      >
        Borrar
      </button>
      <button className="bg-gray-500 hover:bg-gray-700 py-2 px-3 rounded text-white"
      onClick={()=>{
        router.push(`/products/edit/${productId}`)
      }}
      >
        Editar
      </button>
    </div>
  );
}

export default Buttons;
