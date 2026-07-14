"use client";

import { BookOpen, Menu, Settings, X } from "lucide-react";
import { NavLinks } from "@/lib/constent";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div>
          <Link 
           href={'/'} 
           className="flex items-center gap-2">
            <BookOpen size={20} className="text-primary" />
            <h1 className="text-2xl font-bold">Library</h1>
          </Link>
        </div>

        {/* Desktop links */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NavLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={pathname === link.href ? "active" : ""}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header_actions flex-between gap-10">
          <Link href={'/books/create'} className="btn_primary cursor-pointer hidden md:inline-flex">
            Add book
          </Link>
          <button>
            <Settings
              size={20}
              className="text-foreground hover:text-primary transition"
            />
          </button>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="md:hidden"
          >
            <Menu
              size={20}
              className="text-foreground hover:text-primary transition"
            />
          </button>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-background border-l border-border
         flex flex-col pt-24 px-8
         transition md:hidden
         ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className={`absolute top-2.5 -left-4
                     flex items-center justify-center w-8 h-8
                     bg-surface border border-outline-variant/30
                     bg-background
                     text-primary hover:text-primary-container hover:bg-surface-container
                     transition-colors ${!open && "hidden"}`}
        >
          <X size={16} />
        </button>

        <ul className="flex flex-col gap-6">
          {NavLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={pathname === link.href ? "active" : ""}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <Link href={'/books/create'} onClick={() => setOpen(false)} className="btn_primary text-center outline-0 cursor-pointer mt-8 w-full">Add book</Link>
      </div>
    </>
  );
};

export default Header;
