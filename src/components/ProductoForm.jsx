"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function ProductoForm() {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: 0,
    descripcion: "",
  });

  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (params.id) {
      axios.get("/api/products//" + params.id).then((res) => {
        setProducto({
          nombre: res.data.nombre,
          precio: res.data.precio,
          descripcion: res.data.descripcion,
        });
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("descripcion", producto.descripcion);

    if (file) {
      formData.append("imagen", file);
    }

    if (!params.id) {
      const res = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      const res = await axios.put("/api/products/" + params.id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    form.current.reset();
    router.refresh();
    router.push("/products");
  };

  return (
    <div className="flex ">
      <form
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        ref={form}
      >
        <label
          htmlFor="nombre"
          className=" block text-gray-700 text-sm font-bold mb-2"
        >
          Nombre Producto:
        </label>
        <input
          name="nombre"
          type="text"
          placeholder="Nombre"
          onChange={handleChange}
          value={producto.nombre}
          className="shadow appearance-none border rounded w-full py-2 px-3"
          autoFocus
        />

        <label
          htmlFor="precio"
          className=" block text-gray-700 text-sm font-bold mb-2"
        >
          Precio Producto:
        </label>
        <input
          type="text"
          name="precio"
          placeholder="00.00"
          onChange={handleChange}
          value={producto.precio}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <label
          htmlFor="descripcion"
          className=" block text-gray-700 text-sm font-bold mb-2"
        >
          Descripción Producto:
        </label>
        <textarea
          name="descripcion"
          rows={3}
          placeholder="descripción"
          onChange={handleChange}
          value={producto.descripcion}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <label
          htmlFor="img_producto"
          className=" block text-gray-700 text-sm font-bold mb-2"
        >
          Imagen del Producto:
        </label>
        <input
          type="file"
          name="file"
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-2"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />

        {file && (
          <img
            className="w-64 object-contain mx-auto my-4"
            src={URL.createObjectURL(file)}
            alt=""
          />
        )}

        <button className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {params.id ? "Editar Producto" : "Guardar producto"}
        </button>
      </form>
    </div>
  );
}
