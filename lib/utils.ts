import { NextApiRequest } from "next";
import formidable from "formidable";

interface FormidablePromise {
  files: formidable.Files;
  body: formidable.Fields;
}

export const readFile = (req: NextApiRequest): Promise<FormidablePromise> => {
  const form = formidable();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      let fieldsObject = {};

      for (const [key, value] of Object.entries(fields)) {
        if (value) fieldsObject = { ...fieldsObject, [key]: value[0] };
      }

      resolve({ files, body: fieldsObject });
    });
  });
};
