import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import HeaderMain from "../_components/Headers/HeaderMain";
import SideBar from "../_components/Headers/SideBar";
import FooterBar from "../_components/Footer/FooterBar";
import HeaderMobile from "../_components/Headers/HeaderMobile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Welcome | HireMind Ai",
  description: "Welcome to the Homepage of HireMind Ai.",
};

export default function HomeLayout({ children }) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    redirect("/authentication/signIn");
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-[700] 
          backdrop-blur-xl bg-white/50 border-b border-white/10 
          shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
      >
        <nav className="flex items-center justify-between bg-gray-900 px-6 lg:px-16 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="Logo" width={180} />
          </Link>
          <HeaderMain />
          <HeaderMobile />
        </nav>
      </header>
      <aside className="hidden lg:block fixed top-10 h-[90%] w-44 ring-1 ring-gray-200 shadow-xl z-100 bg-gray-100 py-8">
        <SideBar />
      </aside>
      <main className="pt-18 lg:ml-50">{children}</main>
      <footer className="lg:ml-38">
        <FooterBar />
      </footer>
    </>
  );
}
