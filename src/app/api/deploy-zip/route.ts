import { createReadStream, statSync } from "fs";
export async function GET() {
  try {
    const stat = statSync("/home/z/memoraa-deploy.zip");
    const stream = createReadStream("/home/z/memoraa-deploy.zip");
    return new Response(stream, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="memoraa-deploy.zip"',
        "Content-Length": String(stat.size),
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
