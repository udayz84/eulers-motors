import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const MIME_TYPES: Record<string, string> = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".pdf": "application/pdf",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: urlSegments } = await params;
  const filename = urlSegments.join("/");

  // Check cms/public/uploads first
  const cmsFilePath = path.join(process.cwd(), "cms", "public", "uploads", filename);
  const publicFilePath = path.join(process.cwd(), "public", "uploads", filename);

  let targetPath = "";
  if (fs.existsSync(cmsFilePath)) {
    targetPath = cmsFilePath;
    // Auto-sync to public/uploads in background so it's cached on disk
    try {
      const publicDir = path.dirname(publicFilePath);
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      if (!fs.existsSync(publicFilePath)) {
        fs.copyFileSync(cmsFilePath, publicFilePath);
      }
    } catch {
      // Ignore background copy errors
    }
  } else if (fs.existsSync(publicFilePath)) {
    targetPath = publicFilePath;
  }

  if (!targetPath) {
    return new NextResponse("File Not Found", { status: 404 });
  }

  const ext = path.extname(filename).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  const fileBuffer = fs.readFileSync(targetPath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
