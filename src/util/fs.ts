import {
    exists as existsInner,
    readDir as readDirInner,
    type FsDirOptions,
    writeBinaryFile as writeBinaryFileInner,
} from "@tauri-apps/api/fs";

/* FS OVERRIDES START */

export async function readTextFile(fileName: string, options: FsDirOptions) {
    if (fileName.length <= 0) {
        throw new Error("File name is empty");
    }

    return readTextFile(fileName, options);
}

export async function writeTextFile(
    fileName: string,
    data: string,
    options: FsDirOptions
) {
    if (fileName.length <= 0) {
        throw new Error("File name is empty");
    }

    return writeTextFile(fileName, data, options);
}

export async function writeBinaryFile(
    fileName: string,
    data: Uint8Array,
    options: FsDirOptions
) {
    if (fileName.length <= 0) {
        throw new Error("File name is empty");
    }
    return writeBinaryFileInner(fileName, data, options);
}

export async function exists(fileName: string, options: FsDirOptions) {
    return existsInner(fileName, options);
}
