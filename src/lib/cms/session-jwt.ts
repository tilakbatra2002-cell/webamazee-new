import { jwtVerify, SignJWT } from "jose";

export const ADMIN_SESSION_COOKIE = "webamazee_admin_session";
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

export interface SessionJwtPayload {
  sid: string;
  sub: string;
  tv: number;
}

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET?.trim();
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be at least 32 characters.");
  }
  return new TextEncoder().encode(secret);
}

export async function signAdminSessionJwt(payload: SessionJwtPayload): Promise<string> {
  return new SignJWT({ sid: payload.sid, tv: payload.tv })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifyAdminSessionJwt(token: string): Promise<SessionJwtPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ["HS256"],
    });
    const sid = typeof payload.sid === "string" ? payload.sid : "";
    const sub = typeof payload.sub === "string" ? payload.sub : "";
    const tv = typeof payload.tv === "number" ? payload.tv : -1;
    if (!sid || !sub || tv < 0) return null;
    return { sid, sub, tv };
  } catch {
    return null;
  }
}
