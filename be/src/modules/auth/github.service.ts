import fetch from "node-fetch";

import { env } from "../../shared/env.js";

export async function exchangeGithubCode(code: string) {
  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    throw new Error("Failed to obtain GitHub access token");
  }

  const userRes = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  const githubUser = await userRes.json();

  return {
    user: githubUser,
    token: tokenData.access_token,
  };
}
