import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import HeaderMain from "../_components/Headers/HeaderMain";
import SideBar from "../_components/Headers/SideBar";
import FooterBar from "../_components/Footer/FooterBar";

export const metadata = {
  title: "Welcome | HireMind Ai",
  description: "Welcome to the Homepage of HireMind Ai.",
};

export default function HomeLayout({ children }) {
  return (
    <>
      <header className="fixed top-0 right-0 mb-4 left-0 backdrop-blur-md ring-1 z-100 ring-gray-200 shadow-xl bg-gray-100 w-full px-10 py-3">
        <nav className="flex px-5 w-full py-2 justify-between items-center">
          <Link href={"/"}>
            <Image alt="Logo" src={logo} width={120} height={120} />
          </Link>
          <HeaderMain />
        </nav>
      </header>
      <aside className="fixed top-22 h-[90%] w-40 ring-1 ring-gray-200 shadow-xl z-100 bg-gray-100 py-8">
        <SideBar />
      </aside>
      <main className="py-22 max-w-6xl ml-auto">{children}</main>
    </>
  );
}
