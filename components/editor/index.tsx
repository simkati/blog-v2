import { FC, useEffect, useState } from "react";
import { useEditor, EditorContent, getMarkRange, Range } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./ToolBar";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TipTapImage from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import EditLink from "./Link/EditLink";
import Youtube from "@tiptap/extension-youtube";
import GalleryModal, { imageSelectionResult } from "./GalleryModal";
import { getFocusedEditor } from "./EditorUtils";

interface Props {}

const Editor: FC<Props> = (props): JSX.Element => {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const [showGallery, setShowGallery] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: { target: "" },
      }),
      Placeholder.configure({
        placeholder: "Type something",
      }),
      Youtube.configure({
        width: 840,
        height: 472.5,
        HTMLAttributes: {
          class: "mx-auto rounded",
        },
      }),
      TipTapImage.configure({
        HTMLAttributes: {
          class: "mx-auto",
        },
      }),
    ],
    editorProps: {
      handleClick(view, pos, event) {
        const { state } = view;
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link
        );
        if (selectionRange) setSelectionRange(selectionRange);
      },
      attributes: {
        class:
          "prose prose-lg focus-outline-none dark:prose-invert max-w-full mx-auto h-full",
      },
    },
  });

  const handleImageSelection = (result: imageSelectionResult) => {
    editor
      ?.chain()
      .focus()
      .setImage({ src: result.src, alt: result.altText })
      .run();
  };

  useEffect(() => {
    if (editor && selectionRange) {
      editor.commands.setTextSelection(selectionRange);
    }
  }, [editor, selectionRange]);

  return (
    <>
      <div className="p-3 dark:bg-primary-dark bg-primary transition">
        <ToolBar
          editor={editor}
          onOpenImageClick={() => {
            setShowGallery(true);
          }}
        />
        <div className="border h-[1px]w-full bg-secondary-dark dark:bg-secondary-light my-3"></div>
        {editor ? <EditLink editor={editor} /> : null}
        <EditorContent editor={editor} />
      </div>
      <GalleryModal
        visible={showGallery}
        onClose={() => {
          setShowGallery(false);
        }}
        onFileSelect={(result) => {}}
        onSelect={handleImageSelection}
      >
        <></>
      </GalleryModal>
    </>
  );
};

export default Editor;
