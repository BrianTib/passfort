"use client";
import { publicEncrypt, privateDecrypt } from "crypto";

export function encrypt(data: string, publicKey: string) {
    return publicEncrypt(publicKey, Buffer.from(data));
}

export function decrypt(data: Buffer, privateKey: string) {
    return privateDecrypt(privateKey, data).toString();
}

export async function encryptAES(text: string, cryptoKey: CryptoKey) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    // Generate a random Initialization Vector (IV)
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for AES-GCM

    // Encrypt the data
    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        cryptoKey,
        data
    );

    return {
        ciphertext: new Uint8Array(encryptedData),
        iv: iv,
    };
}

export async function decryptAES(
    encryptedData: BufferSource,
    iv: any,
    cryptoKey: CryptoKey
) {
    const decryptedData = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        cryptoKey,
        encryptedData
    );

    const decoder = new TextDecoder();
    return decoder.decode(new Uint8Array(decryptedData));
}
