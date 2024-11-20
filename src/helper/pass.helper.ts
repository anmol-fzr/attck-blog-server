import bcryptjs from "bcryptjs";

const numSaltRounds = 8;

async function hash(rawPass: string) {
  const hashedPass = await bcryptjs.hash(rawPass, numSaltRounds);
  return hashedPass;
}

async function compare(rawPass: string, hashedPass: string) {
  const password = await hash(rawPass);
  const isPassMatch = await bcryptjs.compare(password, hashedPass);
  return isPassMatch;
}

const passHelper = {
  hash,
  compare,
} as const;

export { passHelper };
