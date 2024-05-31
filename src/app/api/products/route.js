import { NextResponse } from "next/server";
import {conn} from '@/libs/mysql';
import { unlink } from "fs/promises";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";

export async function GET(){
    try {
        const result = await conn.query("SELECT * FROM productos");
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({
            mensaje : error.message,
        },{

            status:500,
        })
    }
}

export async function POST(resquest){
    try {
        const data = await resquest.formData();
        const img = data.get("imagen");

        if (!img) {
            return NextResponse.json({
                mensaje: "Imagen es requerida"
            },{
                status: 400
            })
        }

        const filePath = await processImage(img);

        const res = await cloudinary.uploader.upload(filePath);
        if (res) {
            await unlink(filePath);
        }

        const result = await conn.query("INSERT INTO productos SET ?", {
            nombre: data.get("nombre"),
            descripcion: data.get("descripcion"),
            precio: data.get("precio"),
            image: res.secure_url,
        });

        return NextResponse.json({
            nombre: data.get("nombre"),
            descripcion: data.get("descripcion"),
            precio: data.get("precio"),
            id: result.insertId
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            mensaje: error.message
        },
        {
            status: 500
        })
    }
}