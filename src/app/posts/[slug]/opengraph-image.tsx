import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);

  const title = post?.title ?? slug;
  const description = post?.description ?? "";

  const bgData = await readFile(
    join(process.cwd(), "public/og-image.png"),
    "base64"
  );
  const bgSrc = `data:image/png;base64,${bgData}`;

  const fontBold = await readFile(
    join(process.cwd(), "public/fonts/berkeley-mono/BerkeleyMono-Bold.otf")
  );
  const fontRegular = await readFile(
    join(process.cwd(), "public/fonts/berkeley-mono/BerkeleyMono-Regular.otf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
        }}
      >
        <img
          src={bgSrc}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "60px 80px",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              fontFamily: "BerkeleyMono",
              color: "white",
              lineHeight: 1.2,
              marginBottom: description ? 16 : 0,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: 24,
                fontFamily: "BerkeleyMono",
                color: "#ccc",
                lineHeight: 1.4,
              }}
            >
              {description}
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "BerkeleyMono",
          data: fontRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "BerkeleyMono",
          data: fontBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
