import { FC } from "react";
import NextImage from "next/image";
import CheckMark from "../../common/CheckMark";

interface Props {
  src: string;
  selected?: boolean;
  onClick?(): void;
}

const Image: FC<Props> = ({ src, selected, onClick }): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className="rounded overflow-hidden cursor-pointer relative w-[200px] h-[200px]"
    >
      <NextImage
        src={src}
        alt="gallery"
        layout="fill"
        objectFit="cover"
        className="bg-primary-dark hover:scale-110 transition"
      />
      <div className="absolute top-2 left-2">
        <CheckMark visible={selected || false} />
      </div>
    </div>
  );
};

export default Image;
