import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";

export async function GET(resquet, { params }) {
  try {
    const result = await conn.query("SELECT * FROM productos WHERE id = ?", [
      params.id,
    ]);

    if (result.length === 0) {
      return NextResponse.json(
        {
          mensaje: "Producto no encontrado",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      {
        mensaje: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(resquet, { params }) {
  try {
    const result = await conn.query("DELETE FROM productos WHERE id = ?", [
      params.id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          mensaje: "Producto no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      {
        mensaje: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(resquet, { params }) {
  try {
    const data = await resquet.formData();
    const img = data.get("imagen");
    const updateProduct = {
      nombre: data.get("nombre"),
      descripcion: data.get("descripcion"),
      precio: data.get("precio"),
    };

    if (img) {
      const filePath = await processImage(img);
      const res = await cloudinary.uploader.upload(filePath);
      updateProduct.img = res.secure_url;
      if (res) {
        await unlink(filePath);
      }
    }

    const result = await conn.query("UPDATE productos SET ? WHERE id = ?", [
      updateProduct,
      params.id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          mensaje: "Producto no encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    const updatedProducto = await conn.query(
      "SELECT * FROM productos WHERE id = ?",
      [params.id]
    );

    return NextResponse.json(updatedProducto[0]);
  } catch (error) {
    return NextResponse.json(
      {
        mensaje: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
