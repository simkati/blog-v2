import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { IconType } from "react-icons";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";

interface Props {
  navItems: { label: string; icon: IconType; href: string }[];
}

const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const NAV_VISIBILITY = "nav-visibility";

  const updateNavState = () => {
    const newState = !visible;
    setVisible(newState);
    localStorage.setItem(NAV_VISIBILITY, JSON.stringify(newState));
  };

  useEffect(() => {
    const navState = localStorage.getItem(NAV_VISIBILITY);
    if (navState !== null) {
      setVisible(JSON.parse(navState));
    } else {
      setVisible(true);
    }
  }, []);

  return (
    <nav
      className={`h-screen ${
        visible ? "w-60" : "w-12"
      } shadow-sm bg-secondary-light dark:bg-secondary-dark overflow-hidden sticky top-0 flex flex-col justify-between transition-width`}
    >
      <div>
        <Link href="/admin" className="flex items-center space-x-2 p-3 mb-10">
          <Logo className="fill-highlight-light dark:fill-highlight-dark w-5 h-5 inline" />
          {visible && (
            <span className="text-highlight-light dark:text-highlight-dark leading-none w-5 h-5 text-xl font-semibold mb-1">
              Admin
            </span>
          )}
        </Link>
        <div className="space-y-6">
          {navItems.map((item) => {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center text-highlight-light dark:text-highlight-dark text-xl p-3 hover:scale-[0.98] transition"
              >
                <item.icon size={24} />
                {visible && (
                  <span className="ml-2 leading-none">{item.label}</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
      <button
        className="fill-highlight-light dark:fill-highlight-dark p-3 hover:scale-[0.98] transition self-end"
        onClick={updateNavState}
      >
        {visible ? (
          <RiMenuFoldFill size={25} />
        ) : (
          <RiMenuUnfoldFill size={25} />
        )}
      </button>
    </nav>
  );
};

export default AdminNav;
