import { connnectMongo } from "@/config/mongo.config";

function startup() {
  connnectMongo();
}

export { startup };
