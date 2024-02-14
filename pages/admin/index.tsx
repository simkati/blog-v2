import AdminLayout from "@/components/layout/adminLayout";
import { NextPage } from "next";

interface Props {}

const Admin: NextPage<Props> = () => {
  return (
    <div>
      <AdminLayout>
        <div>This is admin</div>
      </AdminLayout>
    </div>
  );
};
export default Admin;
