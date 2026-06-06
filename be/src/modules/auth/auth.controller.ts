import { exchangeGithubCode } from "./github.service.js";

export async function githubAuth(req: any, reply: any) {
  try {
    const { code } = req.body;

    if (!code) {
      return reply.code(400).send({
        error: "Missing code",
      });
    }

    const result = await exchangeGithubCode(code);

    return reply.send(result);
  } catch (err) {
    req.log.error(err);

    return reply.code(500).send({
      error: "OAuth failed",
    });
  }
}
