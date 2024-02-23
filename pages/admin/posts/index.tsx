import { NextPage } from "next";
import AdminLayout from "@/components/layout/adminLayout";

interface Props {}

const Posts: NextPage<Props> = () => {
  return (
    <div>
      <AdminLayout>
        <div>This is posts</div>
      </AdminLayout>
    </div>
  );
};

export default Posts;
