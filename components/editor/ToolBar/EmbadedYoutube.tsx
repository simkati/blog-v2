import { FC, useState } from "react";
import Button from "../ToolBar/button";
import { BsYoutube } from "react-icons/bs";

interface Props {
  onSubmit(link: string): void;
}

const EmbadedYoutube: FC<Props> = ({ onSubmit }): JSX.Element => {
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = () => {
    if (!url.trim()) return hideForm();
    onSubmit(url);
    setUrl("");
    hideForm();
  };

  const hideForm = () => setVisible(false);
  const showForm = () => setVisible(true);

  return (
    <div
      onKeyDown={({ key }) => {
        if (key === "Escape") hideForm();
      }}
      className="relative"
    >
      <Button
        onClick={() => {
          visible ? hideForm() : showForm();
        }}
      >
        <BsYoutube />
      </Button>

      {visible && (
        <div className="absolute top-full mt-4 z-50 right-0">
          <div className="flex space-x-2">
            <input
              autoFocus
              type="text"
              className="bg-transparent rounded border-2
         border-secondary-dark dark:border-primary focus:border-primary-dark
          transition p-2 text-primary-dark dark:text-primary"
              placeholder="http://youtube.com"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
            <button
              onClick={handleSubmit}
              className="bg-action p-2  text-primary rounded text-sm"
            >
              Embed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmbadedYoutube;
