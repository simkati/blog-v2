import { NextApiRequest } from "next";
import formidable from "formidable";

interface FormidablePromise<T> {
  files: formidable.Files;
  body: T;
}

export const readFile = <T extends object>(
  req: NextApiRequest
): Promise<FormidablePromise<T>> => {
  const form = formidable();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      // fields value are array
      let fieldsObject = {};
      for (const [key, value] of Object.entries(fields)) {
        if (value) fieldsObject = { ...fieldsObject, [key]: value[0] };
      }

      resolve({ files, body: fieldsObject as T });
    });
  });
};
