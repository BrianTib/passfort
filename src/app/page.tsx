import Image from "next/image";

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

function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
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

function ListPassword({ name }: { name: string }) {
    return (
        <div className="rounded-lg bg-zinc-800 p-6 shadow-lg">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">{name}</h3>
                <div className="flex gap-6">
                    <button className="p-2 rounded group hover:bg-white transition duration-150">
                        <CopyIcon className="w-6 h-6 text-white group-hover:text-zinc-600 transition duration-150" />
                        <span className="sr-only">Copy password</span>
                    </button>

                    <button className="p-2 rounded group hover:bg-white transition duration-150">
                        <EyeIcon className="w-6 h-6 text-white group-hover:text-zinc-600 transition duration-150" />
                        <span className="sr-only">Reveal password</span>
                    </button>

                    <button className="p-2 rounded group hover:bg-red-500 transition duration-150">
                        <TrashIcon className="w-6 h-6 text-red-500 group-hover:text-white transition duration-150" />
                        <span className="sr-only">Delete password</span>
                    </button>
                </div>
            </div>
            <p className="mt-2 text-gray-400">********</p>
        </div>
    );
}

export default function Home() {
    return (
        <main className="flex-1 p-4">
            <section className="mt-6 max-w-4xl">
                <h2 className="mb-6 text-2xl font-bold">Managed Passwords</h2>
                <div className="grid grid-cols-1 gap-4">
                    <ListPassword name="Amazon" />
                    <ListPassword name="Google" />
                    <ListPassword name="Github" />
                </div>
            </section>
        </main>
    );
}
