import type { MongoClient } from "mongodb";

declare global {
  namespace globalThis {
    var mongo: any;
  }
}
