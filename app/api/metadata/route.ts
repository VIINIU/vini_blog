import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const html = await res.text();

    const getMeta = (name: string) => {
      const reg = new RegExp(`<meta[^>]+(?:property|name)="${name}"[^>]+content="([^"]+)"|<meta[^>]+content="([^"]+)"[^>]+(?:property|name)="${name}"`, "i");
      const match = html.match(reg);
      return match ? (match[1] || match[2]) : null;
    };

    const getTitle = () => {
      const match = html.match(/<title>([^<]+)<\/title>/i);
      return match ? match[1] : null;
    };

    const title = getMeta("og:title") || getMeta("twitter:title") || getTitle() || url;
    const description = getMeta("og:description") || getMeta("twitter:description") || getMeta("description") || "";
    const image = getMeta("og:image") || getMeta("twitter:image:src") || getMeta("twitter:image") || "";
    
    // Extract favicon
    const faviconMatch = html.match(/<link[^>]+rel="[^"]*icon[^"]*"[^>]+href="([^"]+)"/i);
    let favicon = faviconMatch ? faviconMatch[1] : "";
    if (favicon && !favicon.startsWith("http")) {
      const urlObj = new URL(url);
      favicon = `${urlObj.origin}${favicon.startsWith("/") ? "" : "/"}${favicon}`;
    } else if (!favicon) {
      const urlObj = new URL(url);
      favicon = `${urlObj.origin}/favicon.ico`;
    }

    return NextResponse.json({ title, description, image, favicon });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch metadata" }, { status: 500 });
  }
}
