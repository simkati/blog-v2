import { NextPage } from "next";
import Editor from "@/components/editor";
import AdminLayout from "@/components/layout/adminLayout";

interface Props {}

const Create: NextPage<Props> = () => {
  return (
    <AdminLayout title="New Post">
      <div className="max-w-4xl mx-auto">
        <Editor onSubmit={(post) => {}} />
      </div>
    </AdminLayout>
  );
};

export default Create;
