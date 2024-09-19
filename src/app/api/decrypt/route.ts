import { type NextRequest, NextResponse } from "next/server";
import { decrypt } from "$/lib/encryption";

interface EncryptBody {
    content: string;
    password: string;
}

export async function POST(req: NextRequest) {
    const { content, password }: EncryptBody = await req.json();

    if (!content) {
        return NextResponse.json("No content provided", { status: 400 });
    }

    if (!password) {
        return NextResponse.json("No password provided", { status: 400 });
    }

    return NextResponse.json({ encrypted: decrypt(content, password) });
}
