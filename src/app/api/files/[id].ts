import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    const filesCollection = await getCollection("files");

    if (req.method === "DELETE") {
      if (!id || typeof id !== "string")
        return res.status(400).json({ message: "Invalid ID" });

      const result = await filesCollection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0)
        return res.status(404).json({ message: "File not found" });

      return res.status(200).json({ message: "Deleted successfully" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error("API /files/[id] error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
