import { getStore } from "@netlify/blobs";

export default async (req) => {
  const url = new URL(req.url);
  const repo = url.searchParams.get("repo");
  const store = getStore("techstack-storage");

  const data = await store.list({ prefix: repo ? `${repo}/` : "" });

  return new Response(JSON.stringify({ files: data.blobs }), {
    headers: { "Content-Type": "application/json" }
  });
};