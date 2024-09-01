"use client";

import { useState } from "react";
import { Dialog } from "#/components/Dialog";

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function UnlockIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14v3m4-6V7a3 3 0 1 1 6 0v4M5 11h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
            />
        </svg>
    );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    );
}

function ListPassword({
    name,
    passwordRaw,
}: {
    name: string;
    passwordRaw: string;
}) {
    const [isRevealed, setIsRevaled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const revealPasswordMomentarily = () => {
        if (isRevealed) return;
        setIsRevaled(true);
        setTimeout(() => setIsRevaled(false), 5000);
    };

    return (
        <div className="rounded-lg bg-zinc-800 p-6 shadow-lg">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">{name}</h3>
                <div className="flex gap-6">
                    <button
                        className="p-2 rounded group hover:bg-white transition duration-150"
                        onClick={() => {
                            setIsModalOpen(true);
                        }}>
                        <UnlockIcon className="w-6 h-6 text-white group-hover:text-zinc-600 transition duration-150" />
                        <span className="sr-only">Unlock password</span>
                    </button>

                    <button
                        className="p-2 rounded group hover:bg-white transition duration-150"
                        onClick={revealPasswordMomentarily}>
                        <EyeIcon className="w-6 h-6 text-white group-hover:text-zinc-600 transition duration-150" />
                        <span className="sr-only">Reveal password</span>
                    </button>

                    <button className="p-2 rounded group hover:bg-red-500 transition duration-150">
                        <TrashIcon className="w-6 h-6 text-red-500 group-hover:text-white transition duration-150" />
                        <span className="sr-only">Delete password</span>
                    </button>
                </div>
            </div>
            <p className="mt-2 text-gray-400">
                {isRevealed ? passwordRaw : "********"}
            </p>

            {isModalOpen && (
                <Dialog onClose={() => setIsModalOpen(false)}>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-4">
                            Unlock Password
                        </h2>
                        <p className="text-gray-400">
                            To unlock your password, please enter your master
                            password.
                        </p>
                        <div className="mt-4">
                            <label
                                htmlFor="master-password"
                                className="block text-gray-400">
                                Master Password
                                <input
                                    type="password"
                                    id="master-password"
                                    autoComplete="current-password"
                                    className="bg-transparent w-full p-2 mt-1  text-zinc-500 rounded-lg border-2 border-zinc-500 focus:outline-none"
                                />
                            </label>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button className="p-2 rounded bg-red-500 text-white">
                                Unlock
                            </button>
                        </div>
                    </div>
                </Dialog>
            )}
        </div>
    );
}

export default function Home() {
    const getPassword = (name: string): string => {
        return `password for ${name}`;
    };

    return (
        <main className="flex-1 p-4">
            <section className="mt-6 max-w-4xl">
                <h2 className="mb-6 text-2xl font-bold">Managed Passwords</h2>
                <div className="grid grid-cols-1 gap-4">
                    <ListPassword
                        name="Amazon"
                        passwordRaw={getPassword("Amazon")}
                    />
                    <ListPassword
                        name="Google"
                        passwordRaw={getPassword("Google")}
                    />
                    <ListPassword
                        name="Github"
                        passwordRaw={getPassword("Github")}
                    />
                </div>
            </section>

            <section className="mt-6 max-w-4xl">
                <h2 className="mb-6 text-2xl font-bold">Master Password</h2>
                <div className="p-4 mt-6 rounded-lg bg-red-900">
                    <div className="flex items-center mb-3">
                        <span className="font-semibold me-2 px-2.5 py-0.5 rounded bg-red-200 text-red-900">
                            Important
                        </span>
                    </div>

                    <p className="mb-3 text-red-400">
                        PassFort recommends using a master password to manage
                        your other passwords. This acts as an extra layer of
                        security by obfuscating your other passwords
                        <u className="underline m-1 text-red-200 font-bold decoration-red-400 decoration-2">
                            using
                        </u>
                        the master password itself. While you can settle for a
                        permanent master password, we recommend changing your
                        master password periodically. If you opt in for a
                        periodically changing master password, you can go to
                        your settings and change how often you want the change
                        to be. We will then notify you when its time to change
                        your master password, but the change won&apos;t occur
                        automatically, you will be prompted to enact it so that
                        you can store the newly generated password yourself.
                        Keep in mind that
                        <u className="underline m-1 text-red-200 font-bold decoration-red-400 decoration-2">
                            we do not
                        </u>
                        store your master password. If you forget your master
                        password, you will have to reset your account and
                        <u className="underline m-1 text-red-200 font-bold decoration-red-400 decoration-2">
                            lose all of your passwords
                        </u>
                        .
                    </p>
                </div>
            </section>
        </main>
    );
}
