import { writeFile } from "fs/promises";
import path from "path";

export async function processImage(image) {
  const bytes = await img.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), "public", img.name);
  await writeFile(filePath, buffer);
  return filePath;
}
