import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "#/components/Navbar";
import type { Metadata } from "next";

const poppins = Poppins({ weight: "300", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "PassFort",
    description: "Your credentials, your way.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${poppins.className} flex bg-zinc-900 text-white`}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
