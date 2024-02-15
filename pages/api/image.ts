import { NextApiHandler } from "next";
import formidable from "formidable";
import cloudunary from "../../lib/cloudinary";
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
    const { secure_url, url } = await cloudinary.uploader.upload(
      imageFile.filepath,
      {
        folder: "dev-blogs",
      }
    );
    res.json({ image: secure_url });
  });
};

const readAllImage: NextApiHandler = (req, res) => {};

export default handler;
