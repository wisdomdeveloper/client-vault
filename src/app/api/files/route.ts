interface FileDoc {
  name: string;
  size: number;
  type: string;
  createdAt: Date;
}

import { getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Fetching files...");
    const filesCollection = await getCollection<FileDoc>("files");
    const files = await filesCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    console.log("Files fetched:", files);
    return NextResponse.json(files);
  } catch (err) {
    console.error("GET /api/files error:", err);
    return NextResponse.json(
      { message: "DB error", error: err instanceof Error ? err.message : err },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const filesCollection = await getCollection<FileDoc>("files");
    const { name, size, type } = await req.json();

    if (!name || !size || !type) {
      return NextResponse.json(
        { message: "Missing file data" },
        { status: 400 }
      );
    }

    const newFile: FileDoc = { name, size, type, createdAt: new Date() };
    const result = await filesCollection.insertOne(newFile);

    return NextResponse.json({ ...newFile, _id: result.insertedId });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
