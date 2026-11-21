import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { AuthError } from "./auth";
import { RepoError } from "./blogs-repo";
import { ForbiddenError } from "./rbac";

export function apiErrorResponse(error: unknown): NextResponse {
  if (error instanceof AuthError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (error instanceof ForbiddenError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (error instanceof RepoError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (error instanceof ZodError) {
    const firstIssue = error.issues[0];
    return NextResponse.json(
      {
        error: firstIssue?.message || "Validation failed.",
        issues: error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 }
    );
  }
  const code = (error as { code?: number })?.code;
  if (code === 11000) {
    return NextResponse.json(
      { error: "A record with this unique identifier already exists." },
      { status: 409 }
    );
  }
  return NextResponse.json(
    { error: "An unexpected server error occurred. Please try again." },
    { status: 500 }
  );
}
