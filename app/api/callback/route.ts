import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }
  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Missing GitHub OAuth env vars" },
      { status: 500 }
    );
  }

  // Exchange code for access token
  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  const tokenJson = await tokenRes.json();
  const accessToken = tokenJson.access_token;

  if (!accessToken) {
    return NextResponse.json(
      { error: "No access token returned", details: tokenJson },
      { status: 400 }
    );
  }

  // Decap CMS expects this exact postMessage format
  const html = `
<!doctype html>
<html>
  <body>
    <script>
      (function() {
        var data = JSON.stringify({ token: "${accessToken}" });
        window.opener.postMessage(
          'authorization:github:success:' + data,
          window.location.origin
        );
        window.close();
      })();
    </script>
  </body>
</html>
`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
