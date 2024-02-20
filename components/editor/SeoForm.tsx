import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { ChangeEventHandler } from "react";
import slugify from "slugify";

export interface SeoResult {
  meta: string;
  slug: string;
  tags: string;
}

interface Props {
  initialValue?: SeoResult;
  title?: string;
  onChange(result: SeoResult): void;
}

const commonInput =
  "w-full bg-transparent outline-none border-2 border-secondary-dark focus:border-primary-dark focus:dark:border-primary rounded transition text-primary-dark dark:text-primary p-2";

const SEOForm: FC<Props> = ({
  title = "",
  onChange,
  initialValue,
}): JSX.Element => {
  const [values, setValues] = useState({ meta: "", slug: "", tags: "" });

  useEffect(() => {
    const slug = slugify(title.toLowerCase());
    const newValues = { ...values, slug };
    setValues(newValues);
    onChange(newValues);
  }, [title, values]);

  useEffect(() => {
    if (initialValue) {
      setValues({ ...initialValue, slug: slugify(initialValue.slug) });
    }
  }, [initialValue]);

  const { meta, slug, tags } = values;

  const handleChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = ({ target }) => {
    let { name, value } = target;
    if (name === "meta") {
      value = value.substring(0, 150);
    }
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    onChange(newValues);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-primary-dark dark:text-primary text-xl font-semibold">
        SEO Section
      </h1>
      <Input
        value={slug}
        onChange={handleChange}
        name="slug"
        placeholder="slug-goes-here"
        label="Slug"
      />
      <Input
        value={tags}
        onChange={handleChange}
        name="tags"
        placeholder="React, Next JS"
        label="Tags"
      />
      <div className="relative">
        {" "}
        <textarea
          name="meta"
          value={meta}
          onChange={handleChange}
          className={classNames(commonInput, "text-lg h-20 resize-none")}
          placeholder="Meta description"
        ></textarea>
        <p className="absolute bottom-3 right-3 text-primary-dark text-sm dark:text-primary">
          {meta.length}/150
        </p>
      </div>
    </div>
  );
};

const Input: FC<{
  name?: string;
  value?: string;
  placeholder?: string;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}> = ({ name, value, placeholder, label, onChange }) => {
  return (
    <label className="block relative ">
      <span
        className="absolute translate-y-1/2 text-sm font-semibold
           text-primary-dark dark:text-primary pl-2 "
      >
        {label}
      </span>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        className={classNames(commonInput, "italic pl-10")}
        onChange={onChange}
      />
    </label>
  );
};
export default SEOForm;
