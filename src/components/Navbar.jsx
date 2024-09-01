import React from "react";
import Image from "next/image";

import LogoSVG from "/public/rook.svg";
import HomeSVG from "/public/home.svg";

export default function Navbar() {
    return (
        <aside
            id="logo-sidebar"
            className="flex-col w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar">
            <div className="flex flex-col h-full px-3 py-4 overflow-y-auto bg-zinc-800">
                <a
                    href="https://flowbite.com/"
                    className="flex items-center ps-2.5 mb-5">
                    <Image
                        src="/logo.png"
                        className="w-10 h-10 me-3"
                        width={128}
                        height={128}
                        alt="PassFort Logo"
                    />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        PassFort
                    </span>
                </a>
                <ul className="flex-1 space-y-2 font-medium">
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-2 rounded-lg text-white hover:bg-zinc-700 group">
                            <svg
                                className="flex-shrink-0 w-8 h-8 transition duration-75 text-red-400 group-hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    fillRule="evenodd"
                                    d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2zm2-3a2 2 0 1 1 4 0v3h-4zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1"
                                    clipRule="evenodd"
                                />
                            </svg>

                            <span className="flex-1 ms-3 whitespace-nowrap">
                                Passwords
                            </span>
                            <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium rounded-full bg-zinc-700 text-gray-300">
                                6
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-2 rounded-lg text-white hover:bg-zinc-700 group">
                            <svg
                                className="flex-shrink-0 w-8 h-8 text-red-400 transition duration-75 group-hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    fillRule="evenodd"
                                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                                    clipRule="evenodd"
                                />
                            </svg>

                            <span className="ms-3">About</span>
                        </a>
                    </li>
                    <div className="p-4 mt-6 rounded-lg bg-red-900">
                        <div className="flex items-center mb-3">
                            <span className="text-sm font-semibold me-2 px-2.5 py-0.5 rounded bg-red-200 text-red-900">
                                Beta
                            </span>
                        </div>
                        <p className="mb-3 text-sm text-red-400">
                            PassFort is in beta and under active development.
                            We&apos;re adding new features and squashing bugs.
                            If you find any issues, please report them to:
                        </p>
                        <a
                            className="text-sm underline font-medium text-red-400 hover:text-red-300"
                            href="mailto:bptiburcio@gmail.com&subject=I%20found%20a%20bug!">
                            bptiburcio@gmail.com
                        </a>
                    </div>
                </ul>

                <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-zinc-700">
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-2 rounded-lg text-white hover:bg-zinc-700 group">
                            <svg
                                className="flex-shrink-0 w-8 h-8 text-red-400 transition duration-75 group-hover:text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18.113 13.03a6 6 0 0 0 .057-.806c0-.28-.025-.542-.057-.806l1.735-1.357a.415.415 0 0 0 .099-.526l-1.645-2.846a.41.41 0 0 0-.502-.18l-2.048.822a6 6 0 0 0-1.39-.806l-.312-2.18A.4.4 0 0 0 13.647 4h-3.29a.4.4 0 0 0-.403.345l-.313 2.18a6.3 6.3 0 0 0-1.39.806l-2.047-.823a.4.4 0 0 0-.502.181L4.057 9.535a.405.405 0 0 0 .099.526l1.735 1.357a7 7 0 0 0-.058.806c0 .272.025.543.058.806l-1.735 1.357a.415.415 0 0 0-.099.527l1.645 2.845c.099.181.32.247.502.181l2.047-.822q.64.495 1.39.806l.313 2.18a.4.4 0 0 0 .403.345h3.29a.4.4 0 0 0 .403-.346l.312-2.179a6.3 6.3 0 0 0 1.39-.806l2.048.822c.19.074.403 0 .502-.18l1.645-2.846a.415.415 0 0 0-.1-.527zm-6.111 2.073a2.88 2.88 0 0 1-2.879-2.879 2.88 2.88 0 0 1 2.879-2.878 2.88 2.88 0 0 1 2.878 2.878 2.88 2.88 0 0 1-2.878 2.879"
                                    fillRule="evenodd"
                                />
                            </svg>

                            <span className="ms-3">Settings</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>

        // <aside className="flex flex-col py-4 px-8 gap-2 bg-zinc-800">
        //     <div className="flex items-center gap-2 mb-4">
        //         <LogoSVG className="w-12 h-12" />
        //         <h1 className="text-2xl font-bold">PassFort</h1>
        //     </div>
        //     <ul className="text-lg text-white">
        //         <li className="flex items-center gap-2">
        //             <HomeSVG className="w-8 h-8" />
        //             Home
        //         </li>
        //         <li>Services</li>
        //         <li>About</li>
        //         <li>Contact</li>
        //     </ul>
        // </aside>
    );
}
