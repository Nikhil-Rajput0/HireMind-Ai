import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import HeaderMain from "../_components/Headers/HeaderMain";
import SideBar from "../_components/Headers/SideBar";
import FooterBar from "../_components/Footer/FooterBar";
import HeaderMobile from "../_components/Headers/HeaderMobile";

export const metadata = {
  title: "Welcome | HireMind Ai",
  description: "Welcome to the Homepage of HireMind Ai.",
};

export default function HomeLayout({ children }) {
  return (
    <>
      <header
        style={{ zIndex: 9999 }}
        className="fixed top-0 mb-4 bg-transparent backdrop-blur-md ring-1 z-100 ring-gray-200 shadow-xl w-full lg:px-0 py-3 lg:py-3 px-5"
      >
        <nav className="flex px-5 w-full py-2 justify-between items-center bg-white rounded-full lg:rounded-none">
          <Link href={"/"}>
            <Image alt="Logo" src={logo} width={120} height={120} />
          </Link>
          <HeaderMain />
          <HeaderMobile />
        </nav>
      </header>
      <aside className="hidden lg:block fixed top-18 h-[90%] w-44 ring-1 ring-gray-200 shadow-xl z-100 bg-gray-100 py-8">
        <SideBar />
      </aside>
      <main className="py-18 lg:ml-30">{children}</main>
      <footer className="lg:ml-38">
        <FooterBar />
      </footer>
    </>
  );
}
