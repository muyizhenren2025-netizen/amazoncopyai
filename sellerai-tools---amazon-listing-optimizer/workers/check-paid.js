// workers/check-paid.js
export default {
  async fetch(request, env) {
    try {
      // 获取前端传递的用户ID
      const url = new URL(request.url);
      const userId = url.searchParams.get("userId");
      if (!userId) {
        return new Response(JSON.stringify({ isPaid: false }), { status: 400 });
      }

      // 从Cloudflare KV读取付费状态（后续配置KV）
      const isPaid = await env.AMAZONCOPYAI_KV.get(`paid_${userId}`) === "true";
      return new Response(JSON.stringify({ isPaid }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("查询付费状态失败:", err);
      return new Response(JSON.stringify({ isPaid: false }), { status: 500 });
    }
  },
};