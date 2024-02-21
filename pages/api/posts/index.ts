import dbConnect from "@/lib/dbConnect";
import { NextApiHandler } from "next";
import Joi from "joi";
import { postValidationSchema, validateSchema } from "@/lib/validator";
import { readFile } from "@/lib/utils";

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

  res.json({ ok: true });
};

export default handler;
