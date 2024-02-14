import { FC } from "react";
import Image from "./Image";
import { BsCardImage } from "react-icons/bs";

interface Props {
  images: { src: string }[];
  onSelect(src: string): void;
  uploading?: boolean;
  selectedImage?: string;
}

const Gallery: FC<Props> = ({
  images,
  uploading = false,
  selectedImage = "",
  onSelect,
}): JSX.Element => {
  return (
    <div className="flex flex-wrap">
      {uploading && (
        <div
          className=" p-2 aspect-square flex rounded  w-[200px] h-[200px] mt-2 ml-2
        items-center justify-center bg-secondary-light text-primary-dark
        animate-pulse flex-col"
        >
          <BsCardImage size={60} />
          <p>Uploading</p>
        </div>
      )}
      {images.map(({ src }, index) => {
        return (
          <div className="basis-1/4 p-2" key={index}>
            <Image
              src={src}
              selected={selectedImage === src}
              onClick={() => onSelect(src)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
