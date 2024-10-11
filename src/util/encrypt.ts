import { invoke } from "@tauri-apps/api/core";

export async function encrypt(
    data: string,
    masterPassword: string
): Promise<string> {
    return await invoke("encrypt", { data, masterPassword });
}

export async function decrypt(
    encryptedData: string,
    masterPassword: string
): Promise<string> {
    return await invoke("decrypt", { encryptedData, masterPassword });
}

export async function generateMasterPassword(): Promise<string> {
    return await invoke("generate_master_password");
}
