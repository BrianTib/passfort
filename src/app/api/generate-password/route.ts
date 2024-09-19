import { type NextRequest, NextResponse } from "next/server";
import { generateMasterPassword } from "$/lib/encryption";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    // Account for whether or not the user wants to generate a password of a specific length
    const customPasswordLength = searchParams.has("length")
        ? Number(searchParams.get("length"))
        : undefined;

    return NextResponse.json({
        password: generateMasterPassword(customPasswordLength),
    });
}
