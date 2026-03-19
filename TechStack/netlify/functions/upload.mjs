import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  if (req.method !== "POST") return new Response("Sadece POST", { status: 405 });

  try {
    const { fileName, content, repoName } = await req.json();
    const store = getStore("techstack-storage");

    // Dosyayı TechStack formatında kaydet
    await store.set(`${repoName}/${fileName}`, content);

    return new Response(JSON.stringify({ status: "success" }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
};