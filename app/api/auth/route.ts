import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!clientId || !siteUrl) {
    return NextResponse.json(
      { error: "Missing GITHUB_CLIENT_ID or NEXT_PUBLIC_SITE_URL" },
      { status: 500 }
    );
  }

  const redirectUri = `${siteUrl}/api/callback`;
  const scope = "repo"; // allows writing to your repo content

  const url =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scope)}`;

  return NextResponse.redirect(url);
}
