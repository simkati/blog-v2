import { NextPage } from "next";
import Editor from "@/components/editor";
import AdminLayout from "@/components/layout/adminLayout";
import { FinalPost } from "@/components/editor";
import axios from "axios";

interface Props {}

const Create: NextPage<Props> = () => {
  const handleSubmit = async (post: FinalPost) => {
    try {
      // have to generate FormData
      const formData = new FormData();
      for (let key in post) {
        const value = (post as any)[key];
        if (key === "tags" && value.trim()) {
          const tags = value.split(",").map((tag: string) => tag.trim());
          formData.append("tags", JSON.stringify(tags));
        } else formData.append(key, value);
      }
      // submit our post
      const { data } = await axios.post("/api/posts", formData);
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
