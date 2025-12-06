"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import logo from "../../public/logo_small.png";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className=" select-none ">
      {/* 모바일 헤더 */}
      <div
        className={`fixed top-0 left-0 right-0 h-14 z-50 flex items-center justify-between px-4 transition-colors duration-300 sm:hidden ${
          scrolled ? "bg-gradient-to-b from-white via-white/70 to-white/0" : menuOpen ? "bg-white" :"bg-white shadow-xs"
        }`}
      >
        {/* 모바일 메뉴 버튼 */}
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* 모바일 로고 */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/">
            <Image src={logo} alt="로고" width={150} />
          </Link>
        </div>

        {/* 모바일 메뉴 토글 */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center py-4 z-50">
            <Link
              href="/"
              className={`py-2 ${pathname === "/" ? "font-bold text-black" : "text-gray-700"}`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/post"
              className={`py-2 ${pathname === "/post" ? "font-bold text-black" : "text-gray-700"}`}
              onClick={() => setMenuOpen(false)}
            >
              Posts
            </Link>
            <Link
              href="/post/About_me"
              className={`py-2 ${pathname === "/post/About_me" ? "font-bold text-black" : "text-gray-700"}`}
              onClick={() => setMenuOpen(false)}
            >
              About Me
            </Link>
            <Link
              href="/vini_maker"
              className={`py-2 ${pathname === "/vini_maker" ? "font-bold text-black" : "text-gray-700"}`}
              onClick={() => setMenuOpen(false)}
            >
              VINI MAKER  
            </Link>
          </div>
        )}
      </div>

      {/* 웹 헤더 */}
      <nav
        className={`fixed top-0 left-0 right-0 h-fit z-50 py-3 hidden sm:flex items-center justify-end gap-2 px-4 transition-colors duration-300 ${
          scrolled ? "bg-gradient-to-b from-white via-white/80 to-white/0" : ""
        }`}
      >
        <div className={`absolute left-1/2 -translate-x-1/2 ${scrolled ? "transition-opacity opacity-0 duration-300" : "transition-opacity opacity-100 duration-300"}`}>
          <Link href="/">
            <Image src={logo} alt="로고" width={150} />
          </Link>
        </div>
        <Link
          href="/"
          className={`flex text-sm rounded-2xl items-center ${
            pathname === "/" ? "bg-black text-white pt-0.5 px-2" : "font-light px-1"
          }`}
        >
          Home
        </Link>
        <div className="w-0 border-r border-black h-3"></div>
        <Link
          href="/post"
          className={`flex text-sm rounded-2xl items-center ${
            pathname === "/post" ? "bg-black text-white pt-0.5 px-2" : "font-light px-1"
          }`}
        >
          Posts
        </Link>
        <div className="w-0 border-r border-black h-3"></div>
        <Link
          href="/post/About_me"
          className={`flex text-sm rounded-2xl items-center ${
            pathname === "/post/About_me" ? "bg-black text-white pt-0.5 px-2" : "font-light px-1"
          }`}
        >
          About Me
        </Link>
        <div className="w-0 border-r border-black h-3"></div>
        <Link
          href="/vini_maker"
          className={`flex text-sm rounded-2xl items-center ${
            pathname === "/vini_maker" ? "bg-black text-white pt-0.5 px-2" : "font-light px-1"
          }`}
        >
          VINI MAKER
        </Link>
      </nav>
    </header>
  );
}
