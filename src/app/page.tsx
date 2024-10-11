"use client";

import { Dialog } from "#/components/Dialog";
import React, { useState, useEffect } from "react";
import { encrypt, decrypt, generateMasterPassword } from "#/util/encrypt";
import { getStoredPasswords, setStoredPasswords } from "#/util/fs";
import { type Password } from "#/types/password";

/*
#380f17
#08f0b13
#dc2011
#efdfc5
#252b2b
#4c4f54
*/

export default function Home() {
    const [passwords, setPasswords] = useState<Password[]>([]);

    const deletePassword = async (password: Password) => {
        const updatedPasswords = passwords.filter(
            (prevPassword) =>
                prevPassword.name !== password.name &&
                prevPassword.associated_identifier !==
                    password.associated_identifier &&
                prevPassword.value !== password.value
        );

        await setStoredPasswords(updatedPasswords);
        setPasswords(updatedPasswords);
    };

    useEffect(() => {
        const watcherInterval = setInterval(async () => {
            const latestPasswords = await getStoredPasswords();
            setPasswords(latestPasswords);
        }, 3_000);

        return () => clearInterval(watcherInterval);
    }, []);

    return (
        <main className="flex-1 p-4 max-w-7xl">
            <AddPasswordPanel />
            <PasswordsPanel
                passwords={passwords}
                deletePassword={deletePassword}
            />
            <MasterPasswordPanel />
        </main>
    );
}

function AddPasswordPanel() {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget as HTMLFormElement;
        const name = form.elements.namedItem("name") as HTMLInputElement;
        const identifier = form.elements.namedItem(
            "identifier"
        ) as HTMLInputElement;
        const password = form.elements.namedItem(
            "password"
        ) as HTMLInputElement;

        if (!name.value || !password.value) {
            alert("Name and password are required.");
            return;
        }

        await addPassword({
            name: name.value,
            associated_identifier: identifier.value,
            value: password.value,
        });

        setIsModalOpen(false);
    };

    const addPassword = async (password: Password) => {
        const storedPasswords = await getStoredPasswords();
        storedPasswords.push(password);
        await setStoredPasswords(storedPasswords);
    };

    const test = async () => {
        const storedPasswords = await getStoredPasswords();
        console.log("Reading stored:", { storedPasswords });

        // await addPassword({
        //     name: "Google",
        //     password: "password123",
        // });
    };

    return (
        <div className="my-4 ">
            <button
                className="py-2 px-4 rounded bg-zinc-800"
                onClick={() => setIsModalOpen(true)}>
                Add new password
            </button>

            {isModalOpen && (
                <Dialog onClose={() => setIsModalOpen(false)}>
                    <form
                        className="p-4 mt-4 flex flex-col gap-4"
                        onSubmit={handleSubmit}>
                        <h2 className="text-xl font-semibold">
                            Add New Password
                        </h2>

                        <label htmlFor="name" className="block text-gray-400">
                            Name
                            <span className="font-bold text-red-500">*</span>
                            <input
                                type="text"
                                id="name"
                                className="bg-transparent w-full p-2 mt-1  text-zinc-500 rounded-lg border-2 border-zinc-500 focus:outline-none"
                            />
                        </label>

                        <label
                            htmlFor="identifier"
                            className="block text-gray-400">
                            Identified (Email, username etc.)
                            <input
                                type="text"
                                id="identifier"
                                className="bg-transparent w-full p-2 mt-1  text-zinc-500 rounded-lg border-2 border-zinc-500 focus:outline-none"
                            />
                        </label>

                        <label
                            htmlFor="password"
                            className="block text-gray-400">
                            Password
                            <span className="font-bold text-red-500">*</span>
                            <input
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                className="bg-transparent w-full p-2 mt-1  text-zinc-500 rounded-lg border-2 border-zinc-500 focus:outline-none"
                            />
                        </label>

                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={test}
                                type="button"
                                className="p-2 rounded bg-red-500 text-white">
                                Test
                            </button>
                            <button className="p-2 rounded bg-red-500 text-white">
                                Add password
                            </button>
                        </div>
                    </form>
                </Dialog>
            )}
        </div>
    );
}

function PasswordsPanel({
    passwords,
    deletePassword,
}: {
    passwords: Password[];
    deletePassword: (password: Password) => void;
}) {
    if (passwords.length <= 0) {
        return (
            <div className="rounded-lg bg-zinc-800 p-6 shadow-lg mt-6">
                <p className="text-xl font-semibold text-zinc-500">
                    No passwords stored yet. Add a new password to get started.
                </p>
            </div>
        );
    }

    return (
        <>
            <h2 className="mb-6 text-2xl font-bold">Passwords</h2>
            <div className="grid grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
                {passwords.map((password: Password, index: number) => (
                    <ListPassword
                        key={`${password.name.toLowerCase()}-${index}`}
                        password={password}
                        deletePassword={deletePassword}
                    />
                ))}
            </div>
        </>
    );
}

function ListPassword({
    password,
    deletePassword,
}: {
    password: Password;
    deletePassword: (password: Password) => void;
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
                <h3 className="text-xl font-medium">{password.name}</h3>
                <div className="flex gap-2">
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

                    <button
                        className="p-2 rounded group hover:bg-red-500 transition duration-150"
                        onClick={() => deletePassword(password)}>
                        <TrashIcon className="w-6 h-6 text-red-500 group-hover:text-white transition duration-150" />
                        <span className="sr-only">Delete password</span>
                    </button>
                </div>
            </div>
            <p className="mt-2 text-gray-400">
                {isRevealed ? password.value : "********"}
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

function MasterPasswordPanel() {
    const [generatedMasterPassword, setGeneratedMasterPassword] =
        useState<string>("");
    const [copySuccess, setCopySuccess] = useState(false);

    const getPassword = (name: string): string => {
        return `password for ${name}`;
    };

    const handleCopy = () => {
        if (!generatedMasterPassword) {
            return;
        }

        navigator.clipboard.writeText(generatedMasterPassword).then(() => {
            setCopySuccess(true); // Show success message
            setTimeout(() => setCopySuccess(false), 2000); // Hide after 2 seconds
        });
    };

    const generatePassword = async () => {
        setGeneratedMasterPassword(await generateMasterPassword());
    };

    useEffect(() => {
        generatePassword();
    }, []);

    return (
        <section className="mt-6">
            <h2 className="mb-6 text-2xl font-bold">Master Password</h2>
            <div className="p-4 mt-6 rounded-lg bg-red-900">
                <div className="flex items-center mb-3">
                    <span className="font-semibold me-2 px-2.5 py-0.5 rounded bg-red-200 text-orange-900">
                        Important Notice
                    </span>
                </div>

                <p className="mb-3 text-red-400">
                    PassFort recommends using a master password to securely
                    manage your other passwords.
                    <br />
                    <br />
                    This provides an additional layer of security by further
                    encrypting your passwords
                    <u className="underline m-1 text-red-200 font-bold decoration-red-400 decoration-2">
                        with the master password.
                    </u>
                    Although you can use a permanent master password, we suggest
                    changing it periodically for enhanced security. If you
                    choose to enable periodic changes, you can customize the
                    frequency in your settings. We will notify you when
                    it&apos;s time to update your master password, but the
                    change won&apos;t be automatic—you&apos;ll be prompted to
                    generate a new one so you can securely store it yourself.
                    Please note that
                    <u className="underline m-1 text-red-200 font-bold decoration-red-400 decoration-2">
                        we do not store
                    </u>
                    your master password. If you forget it, you will need to
                    reset your account and
                    <u className="underline m-1 text-red-200 font-bold decoration-red-400 decoration-2">
                        all of your passwords will be lost.
                    </u>
                    Such is the price of security.
                </p>
            </div>

            <div className="p-4 mt-6 rounded-lg bg-zinc-800">
                <div className="flex gap-2">
                    <h3 className="text-lg">Generated Master Password</h3>

                    {copySuccess && (
                        <div className="flex items-center">
                            <span className="font-semibold me-2 px-2.5 py-0.5 rounded bg-green-200 text-green-900">
                                Copied!
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 mt-2">
                    <div
                        className={`flex items-center px-2 rounded-lg border-2 ${
                            copySuccess ? "border-green-500" : "border-zinc-500"
                        } focus:outline-none`}>
                        <input
                            className={`bg-transparent w-fit min-w-96 h-8 p-2 ${
                                copySuccess ? "text-green-500" : "text-zinc-500"
                            } font-semibold`}
                            value={generatedMasterPassword}
                            disabled={true}
                        />

                        <button
                            className="flex p-1 rounded"
                            onClick={handleCopy}>
                            <svg
                                className={`w-6 h-6 ${
                                    copySuccess
                                        ? "text-green-500"
                                        : "text-white"
                                }`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                    stroke="currentColor"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"
                                />
                            </svg>
                        </button>

                        <button
                            className="flex p-1 rounded"
                            onClick={() => generatePassword()}>
                            <svg
                                className={`w-6 h-6 ${
                                    copySuccess
                                        ? "text-green-500"
                                        : "text-white"
                                }`}
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none">
                                <g fill="currentColor">
                                    <path d="M5 4a1 1 0 0 0 0 2h.01a1 1 0 0 0 0-2zm2 4a1 1 0 0 1 1-1h.01a1 1 0 0 1 0 2H8a1 1 0 0 1-1-1m4.01 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M3.25 1A2.25 2.25 0 0 0 1 3.25v9.5A2.25 2.25 0 0 0 3.25 15h9.5A2.25 2.25 0 0 0 15 12.75v-9.5A2.25 2.25 0 0 0 12.75 1zM2.5 3.25a.75.75 0 0 1 .75-.75h9.5a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75h-9.5a.75.75 0 0 1-.75-.75z"
                                        clipRule="evenodd"
                                    />
                                </g>
                            </svg>
                        </button>
                    </div>

                    <button className="bg-red-800 px-8 py-1 rounded">
                        <span className="sr-only">Generate new password</span>
                        <span className="text-red-300 font-bold">
                            I&apos;ve stored it! (Update passwords)
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}

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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
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
