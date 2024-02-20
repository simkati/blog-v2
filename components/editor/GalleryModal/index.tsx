import ModalContainer, { ModalProps } from "@/components/common/ModalContainer";
import { FC, useCallback, useState } from "react";
import Gallery from "./Gallery";
import Image from "next/image";
import ActionButton from "@/components/common/ActionButton";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { ChangeEventHandler } from "react";

export interface imageSelectionResult {
  src: string;
  altText: string;
}

interface Props extends ModalProps {
  images: { src: string }[];
  uploading?: boolean;
  onFileSelect(image: File): void;
  onSelect(result: imageSelectionResult): void;
}

const GalleryModal: FC<Props> = ({
  visible,
  uploading,
  images,
  onClose,
  onFileSelect,
  onSelect,
}): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState("");
  const [altText, setAltText] = useState("");

  const handleClose = useCallback(() => {
    onClose && onClose();
  }, [onClose]);

  const handleOnImageChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { files } = target;
    if (!files) return;

    const file = files[0];
    if (!file.type.startsWith("image")) return handleClose();
    onFileSelect(file);
  };

  const handleSelection = () => {
    if (!selectedImage) return handleClose();
    onSelect({ src: selectedImage, altText: altText });
    onClose && onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className="max-w-4xl bg-primary-dark dark:bg-primary rounded">
        <div className="flex">
          <div className="basis-[75%] max-h-[450px] overflow-y-auto custom-scroll-bar">
            <Gallery
              images={images}
              onSelect={(src) => setSelectedImage(src)}
              uploading={uploading}
              selectedImage={selectedImage}
            />
          </div>
          <div className="basis-1/4 p-2">
            <div className="space-y-4">
              <div>
                <input
                  onChange={handleOnImageChange}
                  type="file"
                  id="image-input"
                  hidden
                />
                <label htmlFor="image-input">
                  <div
                    className="w-full border-2 border-action rounded
                  text-action flex item-center justify-center space-x-2 p-2 cursor-pointer"
                  >
                    <AiOutlineCloudUpload />
                    <span>Upload Image</span>
                  </div>
                </label>
              </div>
              {selectedImage && (
                <>
                  <textarea
                    className="resize-none w-full bg-transparent rounded border-2
         border-secondary-dark dark:border-primary focus:ring-1
         text-primary dark:text-primary-dark h-32 p-1"
                    placeholder="Alt text"
                    value={altText}
                    onChange={({ target }) => setAltText(target.value)}
                  ></textarea>
                  <ActionButton title="Select" onClick={handleSelection} />
                  <div className="relative aspect-video bg-png-pattern">
                    <Image
                      src={selectedImage}
                      layout="fill"
                      alt="galery"
                      objectFit="contain"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default GalleryModal;
