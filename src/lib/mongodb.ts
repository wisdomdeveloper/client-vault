import { Collection, Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB !;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    // @ts-ignore
    global._mongoClientPromise = client.connect();
  }
  // @ts-ignore
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  try {
    const client = await clientPromise;
    return client.db(dbName);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

export async function getCollection<
  T extends import("mongodb").Document = import("mongodb").Document
>(collectionName: string): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(collectionName);
}
