import { FC, LinkHTMLAttributes, useEffect, useState } from "react";
import { validateUrl } from "../EditorUtils";
import { LinkOptions } from "@tiptap/extension-link";

interface Props {
  visible: boolean;
  onSubmit(link: linkOption): void;
  initialState?: linkOption;
}

export type linkOption = {
  url: string;
  openInNewTab: boolean;
};
const defaultLink = {
  url: "",
  openInNewTab: false,
};

const LinkForm: FC<Props> = ({
  visible,
  initialState,
  onSubmit,
}): JSX.Element | null => {
  const [link, setLink] = useState<linkOption>(defaultLink);

  const handleSubmit = () => {
    onSubmit({ ...link, url: validateUrl(link.url) });
    resetForm();
  };

  useEffect(() => {
    if (initialState) setLink({ ...initialState });
  }, [initialState]);

  if (!visible) return null;

  const resetForm = () => {
    setLink({ ...defaultLink });
  };

  return (
    <div
      className="rounded p-2 bg-primary shadow-sm
     dark:bg-primary-dark shadow-secondary-dark"
    >
      <input
        autoFocus
        type="text"
        className="bg-transparent rounded border-2
         border-secondary-dark dark:border-primary focus:border-primary-dark
          transition p-2 text-primary-dark dark:text-primary"
        placeholder="http://example.com"
        value={link.url}
        onChange={({ target }) => setLink({ ...link, url: target.value })}
      />
      <div className="flex items-center space-x-2 mt-2">
        <input
          type="checkbox"
          id="open-in-new-tab"
          checked={link.openInNewTab}
          onChange={({ target }) =>
            setLink({ ...link, openInNewTab: target.checked })
          }
        />
        <label htmlFor="open-in-new-tab">open in new tab</label>
        <div className="flex-1 text-right">
          <button
            onClick={handleSubmit}
            className="bg-action px-2 py-1 text-primary rounded text-sm"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkForm;
