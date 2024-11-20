import { connnectMongo } from "@/config/mongo.config";

function startup() {
  connnectMongo();
}

export { startup };
export * from "./pass.helper";
