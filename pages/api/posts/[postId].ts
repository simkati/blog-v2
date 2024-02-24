import formidable from "formidable";
import { NextApiHandler } from "next";
import cloudinary from "../../../lib/cloudinary";
import { readFile } from "../../../lib/utils";
import { postValidationSchema, validateSchema } from "../../../lib/validator";
import Post from "../../../models/Post";

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  switch (method) {
    case "PATCH":
      return updatePost(req, res);
    default:
      res.status(404).send("Not found!");
  }
};

interface IncomingPost {
  title: string;
  content: string;
  slug: string;
  meta: string;
  tags: string;
}

const updatePost: NextApiHandler = async (req, res) => {
  const postId = req.query.postId as string;
  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: "Post not found!" });

  const { files, body } = await readFile<IncomingPost>(req);

  let tags = [];
  // tags will be in string form so converting to array
  if (body.tags) tags = JSON.parse(body.tags as string);

  const error = validateSchema(postValidationSchema, { ...body, tags });
  if (error) return res.status(400).json({ error });

  const { title, content, meta, slug } = body;
  post.title = title;
  post.content = content;
  post.meta = meta;
  post.tags = tags;
  post.slug = slug;

  // update thumbnail only if there is any
  const thumbnail = files.thumbnail as formidable.File;
  if (thumbnail) {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      thumbnail.filepath,
      {
        folder: "dev-blogs",
      }
    );

    // #1-cond. => the post can already have thumbnail
    // so remove old, upload new image and then update record inside DB.
    const publicId = post.thumbnail?.public_id;
    if (publicId) await cloudinary.uploader.destroy(publicId);

    // #2-cond. => the post can be without thumbnail
    // just upload image and update record inside DB.
    post.thumbnail = { url, public_id };
  }

  await post.save();
  res.json({ post });
};

export default handler;
