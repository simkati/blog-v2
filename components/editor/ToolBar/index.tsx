import { FC } from "react";
import { Editor } from "@tiptap/react";
import DropdownOptions from "@/components/common/DropdownOptions";
import { AiFillCaretDown } from "react-icons/ai";
import { getFocusedEditor } from "../EditorUtils";
import Button from "./button";
import {
  BsTypeBold,
  BsTypeStrikethrough,
  BsBraces,
  BsCode,
  BsListOl,
  BsListUl,
  BsTypeItalic,
  BsTypeUnderline,
  BsImageFill,
  BsLink45Deg,
  BsLink,
  BsYoutube,
} from "react-icons/bs";
import { RiDoubleQuotesL } from "react-icons/ri";
import InsertLink from "../Link/insertLink";
import { linkOption } from "../Link/linkForm";
import EmbadedYoutube from "./EmbadedYoutube";

interface Props {
  editor: Editor | null;
  onOpenImageClick?(): void;
}

const ToolBar: FC<Props> = ({
  editor,
  onOpenImageClick,
}): JSX.Element | null => {
  if (!editor) return null;

  const options = [
    {
      label: "Paragraph",
      onClick: () => {
        getFocusedEditor(editor).setParagraph().run();
      },
    },
    {
      label: "Heading 1",
      onClick: () => {
        getFocusedEditor(editor).toggleHeading({ level: 1 }).run();
      },
    },
    {
      label: "Heading 2",
      onClick: () => {
        getFocusedEditor(editor).toggleHeading({ level: 2 }).run();
      },
    },
    {
      label: "Heading 3",
      onClick: () => {
        getFocusedEditor(editor).toggleHeading({ level: 3 }).run();
      },
    },
  ];

  const getLabel = (): string => {
    if (editor.isActive("heading", { level: 1 })) return "Heading 1";
    if (editor.isActive("heading", { level: 2 })) return "Heading 2";
    if (editor.isActive("heading", { level: 3 })) return "Heading 3";
    return "Paragraph";
  };

  const handelLinkSubmit = ({ url, openInNewTab }: linkOption) => {
    const { commands } = editor;
    if (openInNewTab) commands.setLink({ href: url, target: "_blank" });
    else {
      commands.setLink({ href: url });
    }
  };

  const handelEmbededYooutube = (url: string) => {
    getFocusedEditor(editor).setYoutubeVideo({ src: url }).run();
  };

  const Head = () => {
    return (
      <div className="flex items-center space-x-2 text-primary-dark dark:text-primary">
        <p>{getLabel()}</p>
        <AiFillCaretDown />
      </div>
    );
  };

  return (
    <div className="flex items-center">
      <DropdownOptions head={<Head />} options={options} />
      <div className="h-4 w-[1px] bg-secondary-dark dark:bg-secondary-light mx-8" />
      <div className="flex items-center space-x-3">
        <Button
          active={editor.isActive("bold")}
          onClick={() => {
            if (!editor) return;
            getFocusedEditor(editor).toggleBold().run();
          }}
        >
          <BsTypeBold />
        </Button>
        <Button
          active={editor.isActive("italic")}
          onClick={() => {
            if (!editor) return;
            getFocusedEditor(editor).toggleItalic().run();
          }}
        >
          <BsTypeItalic />
        </Button>
        <Button
          active={editor.isActive("underline")}
          onClick={() => {
            getFocusedEditor(editor).toggleUnderline().run();
          }}
        >
          <BsTypeUnderline />
        </Button>
        <Button
          active={editor.isActive("strike")}
          onClick={() => {
            getFocusedEditor(editor).toggleStrike().run();
          }}
        >
          <BsTypeStrikethrough />
        </Button>
      </div>
      <div className="h-4 w-[1px] bg-secondary-dark dark:bg-secondary-light mx-8" />
      <div className="flex items-center space-x-3">
        <Button
          active={editor.isActive("blockquote")}
          onClick={() => {
            getFocusedEditor(editor).toggleBlockquote().run();
          }}
        >
          <RiDoubleQuotesL />
        </Button>
        <Button
          active={editor.isActive("code")}
          onClick={() => {
            getFocusedEditor(editor).toggleCode().run();
          }}
        >
          <BsCode />
        </Button>
        <Button
          active={editor.isActive("codeblock")}
          onClick={() => {
            getFocusedEditor(editor).toggleCodeBlock().run();
          }}
        >
          <BsBraces />
        </Button>
        <InsertLink onSubmit={handelLinkSubmit} />

        <Button
          active={editor.isActive("orderedList")}
          onClick={() => {
            getFocusedEditor(editor).toggleOrderedList().run();
          }}
        >
          <BsListOl />
        </Button>
        <Button
          active={editor.isActive("bulletList")}
          onClick={() => {
            getFocusedEditor(editor).toggleBulletList().run();
          }}
        >
          <BsListUl />
        </Button>
      </div>
      <div className="h-4 w-[1px] bg-secondary-dark dark:bg-secondary-light mx-8" />
      <div className="flex items-center space-x-3">
        <EmbadedYoutube onSubmit={handelEmbededYooutube} />
        <Button onClick={onOpenImageClick}>
          <BsImageFill />
        </Button>
      </div>
    </div>
  );
};

export default ToolBar;