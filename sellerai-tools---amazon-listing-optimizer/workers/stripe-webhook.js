// workers/stripe-webhook.js
export default {
  async fetch(request, env) {
    // 后续替换为你的Stripe密钥
    const stripeSecretKey = "你的Stripe Secret Key";
    const webhookSecret = "你的Stripe Webhook签名密钥";

    const stripe = require("stripe")(stripeSecretKey);
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    try {
      const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      // 处理支付成功事件
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const userId = session.client_reference_id;
        if (userId) {
          // 存储付费状态到KV，30天过期
          await env.AMAZONCOPYAI_KV.put(`paid_${userId}`, "true", { expirationTtl: 2592000 });
        }
      }
      return new Response("Success", { status: 200 });
    } catch (err) {
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }
  },
};