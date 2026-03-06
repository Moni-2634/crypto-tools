import { tools, guides } from "@/lib/tools";
import { renderOgCard, OG_SIZE } from "@/lib/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const slug = searchParams.get("slug");

  if (!type || !slug) {
    return new Response("Missing type or slug parameter", { status: 400 });
  }

  if (type === "tool") {
    const tool = tools.find((t) => t.slug === slug);
    if (!tool) {
      return new Response("Tool not found", { status: 404 });
    }

    return renderOgCard({
      title: tool.name,
      description: tool.description,
      label: "Tool",
    });
  }

  if (type === "guide") {
    const guide = guides.find((g) => g.slug === slug);
    if (!guide) {
      return new Response("Guide not found", { status: 404 });
    }

    return renderOgCard({
      title: guide.name,
      description: guide.description,
      label: "Guide",
    });
  }

  return new Response("Invalid type parameter. Use 'tool' or 'guide'.", {
    status: 400,
  });
}
