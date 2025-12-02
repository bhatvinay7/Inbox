import Header from '../../components/ui/header'
import LayoutController from "../../components/ui/layoutController";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={` flex flex-col relative h-screen  `}>
        <Header/>
        <LayoutController>
        {children}
        </LayoutController>
    </div>
  );
}
