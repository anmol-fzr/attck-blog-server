import * as jwt from "jsonwebtoken";
import { envs } from "@/utils";

interface GetTokenPayload {
  userId: string;
  email: string;
}

const secret = envs.JWT_SECRET_KEY;

const jwtHelper = {
  getToken(payload: GetTokenPayload) {
    const token = jwt.sign(payload, secret);
    return token;
  },

  parseToken(token: string) {
    const payload = jwt.decode(token);
    return payload as GetTokenPayload;
  },

  verifyToken(token: string) {
    const payload = jwt.verify(token, secret);
    return payload as GetTokenPayload;
  },
};

export { jwtHelper };
