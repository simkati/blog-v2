import { NextPage } from "next";
import Editor from "@/components/editor";
import AdminLayout from "@/components/layout/adminLayout";
import { FinalPost } from "@/components/editor";
import axios from "axios";
import { generateFormData } from "@/utils/helper";

interface Props {}

const Create: NextPage<Props> = () => {
  const handleSubmit = async (post: FinalPost) => {
    try {
      // have to generate FormData
      const formData = generateFormData(post);

      // submit our post
      const { data } = await axios.post("/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <AdminLayout title="New Post">
      <div className="max-w-4xl mx-auto">
        <Editor onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  );
};

export default Create;
