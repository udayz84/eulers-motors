import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

/**
 * On-demand cache revalidation endpoint for Strapi Webhooks.
 * Triggers instant ISR invalidation when editors publish or update entries.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.STRAPI_REVALIDATE_SECRET;
  const token =
    req.headers.get("x-strapi-revalidation-token") ||
    req.nextUrl.searchParams.get("secret");

  // Validate authorization token if configured
  if (secret && token !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const model = body?.model || req.nextUrl.searchParams.get("model");
    const path = req.nextUrl.searchParams.get("path");

    const revalidated: string[] = [];

    // Revalidate by model / tag
    if (model) {
      const tag = `strapi:${model}`;
      revalidateTag(tag);
      revalidated.push(tag);

      // Homepage specific invalidation
      if (model === "home-page" || model === "product" || model === "review" || model === "article") {
        revalidatePath("/");
        revalidated.push("/");
      }
      if (model === "technology-page" || model === "review") {
        revalidatePath("/technology");
        revalidated.push("/technology");
      }
      if (model === "careers-page" || model === "career-position") {
        revalidatePath("/careers");
        revalidated.push("/careers");
      }
      if (
        model === "dealer-locator-page" ||
        model === "dealer" ||
        model === "charging-station" ||
        model === "service-center"
      ) {
        revalidatePath("/dealer-locator");
        revalidatePath("/service-centers");
        revalidated.push("/dealer-locator", "/service-centers");
      }
      if (model === "charging-stations-page" || model === "charging-station") {
        revalidatePath("/charging-stations");
        revalidated.push("/charging-stations");
      }
      if (
        model === "about-page" ||
        model === "timeline-milestone" ||
        model === "leadership-member" ||
        model === "award" ||
        model === "esg-report"
      ) {
        if (model !== "about-page") {
          const pluralTag = `strapi:${model}s`;
          revalidateTag(pluralTag);
          revalidated.push(pluralTag);
        }
        revalidatePath("/about");
        revalidated.push("/about");
      }
    }

    // Revalidate by explicit path
    if (path) {
      revalidatePath(path);
      revalidated.push(path);
    }

    // If neither model nor path specified, revalidate entire home page
    if (revalidated.length === 0) {
      revalidateTag("strapi:home-page");
      revalidatePath("/");
      revalidated.push("strapi:home-page", "/");
    }

    return NextResponse.json({
      revalidated: true,
      targets: revalidated,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to revalidate", message: (error as Error).message },
      { status: 500 }
    );
  }
}

