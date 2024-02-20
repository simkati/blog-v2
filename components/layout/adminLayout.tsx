import { FC, ReactNode } from "react";
import AdminNav from "@/components/common/AdminNav";
import {
  AiOutlineDashboard,
  AiOutlineContainer,
  AiOutlineTeam,
  AiOutlineMail,
  AiOutlineContacts,
  AiOutlineFileAdd,
} from "react-icons/ai";
import Link from "next/link";
import AppHead from "../common/AppHead";

const navItems = [
  { label: "Dashboard", icon: AiOutlineDashboard, href: "/admin" },
  { label: "Posts", icon: AiOutlineContainer, href: "/admin/posts" },
  { label: "Users", icon: AiOutlineTeam, href: "/admin/users" },
  { label: "Comments", icon: AiOutlineMail, href: "/admin/comments" },
  { label: "Contact", icon: AiOutlineContacts, href: "/admin/contact" },
];

interface Props {
  children: ReactNode;
  title?: string;
}

const AdminLayout: FC<Props> = ({ title, children }): JSX.Element => {
  return (
    <>
      <AppHead title={title} />
      <div className="flex">
        <AdminNav navItems={navItems} />
        <div className="flex-1 p-4">{children}</div>
        <Link
          href="/admin/post/create"
          className="bg-secondary-dark dark:bg-secondary-light text-primary dark:text-primary-dark fixed z-10 right-10 bottom-10 rounded-full hover:scale-90 shadow-sm transition"
        >
          <AiOutlineFileAdd size={24}></AiOutlineFileAdd>
        </Link>
      </div>
    </>
  );
};

export default AdminLayout;
