import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "#/components/Navbar";

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
