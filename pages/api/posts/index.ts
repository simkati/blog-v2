import dbConnect from "@/lib/dbConnect";
import { NextApiHandler } from "next";
import Joi from "joi";
import { postValidationSchema, validateSchema } from "@/lib/validator";
import { readFile } from "@/lib/utils";
import Post from "@/models/Post";
import formidable from "formidable";
import cloudinary from "@/lib/cloudinary";

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET": {
      await dbConnect();
      res.json({ ok: true });
    }
    case "POST": {
      return createNewPost(req, res);
    }
  }
};

const createNewPost: NextApiHandler = async (req, res) => {
  const { files, body } = await readFile(req);

  let tag: string[] = [];
  if (body.tags) {
    tag = JSON.parse(body.tags as unknown as string);
  }

  const error = validateSchema(postValidationSchema, { ...body, tags: tag });
  if (error) return res.status(400).json({ error });

  const { title, content, slug, meta } = body;

  await dbConnect();
  const alreadyExist = await Post.findOne({ slug });
  if (alreadyExist)
    return res.status(400).json({ error: "Slug need to be unique" });

  const newPost = new Post({
    title,
    content,
    slug,
    meta,
    tag,
    author: "6348acd2e1a47ca32e79f46f",
  });

  const thumbnail = files.thumbnail as unknown as formidable.File;
  if (thumbnail) {
    console.log("thumbnail");
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      thumbnail.filepath,
      {
        folder: "dev-blogs",
      }
    );
    newPost.thumbnail = { url, public_id };
  }
  await newPost.save();

  res.json({ post: newPost });
};

export default handler;
