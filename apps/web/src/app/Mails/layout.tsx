import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Sidebar from "../../components/ui/sidebar";
import Header from '../../components/ui/header'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={` flex flex-col relative h-screen  `}>
        <Header/>
        <div className="w-full relative grid grid-cols-1 bg-white sm:grid-cols-[150px_1fr] md:grid-cols-[250px_1fr]">
        <div className="w-full relative h-screen bg-blue-50 ">
        <Sidebar/>   
        </div>    
        {children}
        </div>
      </div>
  );
}
