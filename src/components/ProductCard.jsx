import Link from "next/link";

function ProductCard({ product }) {
  return (
    <Link
      className="bg-white rounded-lg border-gray-800 mb-3 hover:bg-gray-100 hover:cursor-pointer"
      href={`/products/${product.id}`}
    >
      {product.img && <img src={product.img} className="w-full rounded-t-lg" alt="" />}
      <div className="p-4">
        <h1 className="text-lg font-bold ">{product.nombre}</h1>
        <h2 className="text-2xl text-slate-600">{product.precio}</h2>
        <p>{product.descripcion}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
