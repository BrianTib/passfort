import {
    writeBinaryFile,
    readBinaryFile,
    createDir,
    BaseDirectory,
    exists,
} from "@tauri-apps/api/fs";

import { type Password } from "#/types/password";

const KEYS_FILE = "5b35d5cc-d9b4-4e08-8cd7-b27daf96fdc6.bin";

async function ensureAppDataDirectoryExists() {
    const appDataExists = await exists("", { dir: BaseDirectory.AppData });
    if (!appDataExists) {
        await createDir("", { dir: BaseDirectory.AppData, recursive: true });
    }
}

export async function getStoredPasswords(): Promise<Password[]> {
    await ensureAppDataDirectoryExists();

    const fileExists = await exists(KEYS_FILE, { dir: BaseDirectory.AppData });
    if (!fileExists) return [];

    const buffer = await readBinaryFile(KEYS_FILE, {
        dir: BaseDirectory.AppData,
    });
    return JSON.parse(new TextDecoder().decode(buffer)) as Password[];
}

export async function setStoredPasswords(passwords: Password[]) {
    await ensureAppDataDirectoryExists();

    const data = new TextEncoder().encode(JSON.stringify(passwords));
    await writeBinaryFile(
        { path: KEYS_FILE, contents: data },
        {
            dir: BaseDirectory.AppData,
        }
    );
}
