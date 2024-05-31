import axios from "axios";
import Buttons from "./Buttons";

async function loadProduct(id) {
  const { data } = await axios.get(`http://localhost:3000/api/products/` + id);
  return data;
}

async function ProductPage({ params }) {
  const product = await loadProduct(params.id);
  return (
    <section className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <div className="flex w-4/6 h-2/6 justify-center ">
        <div className="bg-white p-6 rounded-lg w-1/3">
          <h3 className="text-2xl font-bold mb-3">{product.nombre}</h3>
          <h4 className="text-4xl font-bold">{product.precio}$</h4>
          <p className="text-slate-700">{product.descripcion}</p>
          <Buttons productId={product.id} />
        </div>
        <img src={product.img} className="w-1/3" alt="" />
      </div>
    </section>
  );
}

export default ProductPage;
