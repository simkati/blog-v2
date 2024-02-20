import { NextApiHandler } from "next";
import formidable from "formidable";
import cloudinary from "../../lib/cloudinary";

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      return uploadNewImage(req, res);
    case "GET":
      return readAllImage(req, res);
    default:
      return res.status(404).send("Not found!");
  }
};
const uploadNewImage: NextApiHandler = (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!files.image) return res.status(500).json({ error: err.message });
    const imageFile = files.image[0];
    const { secure_url } = await cloudinary.uploader.upload(
      imageFile.filepath,
      {
        folder: "dev-blogs",
      }
    );
    res.json({ secure_url });
  });
};

const readAllImage: NextApiHandler = async (req, res) => {
  try {
    const { resources } = await cloudinary.api.resources({
      resource_type: "image",
      type: "upload",
      prefix: "dev-blogs",
    });
    const images = resources.map(({ secure_url }: any) => {
      return { src: secure_url };
    });
    res.json({ images });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export default handler;
