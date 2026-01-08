// workers/gemini-proxy.js
export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    try {
      // 1. 新增：简单鉴权（防止 Worker 被恶意调用）
      const authHeader = request.headers.get("X-Worker-Auth");
      if (authHeader !== "your-random-secret-key") { // 和前端一致
        return new Response("Unauthorized", { status: 401 });
      }

      // 2. 接收前端传递的参数（含品牌）
      const { productName, sellingPoints, category, brand } = await request.json();
      const API_KEY = "AIzaSyCaWzCZHyKF0QEsYcyCsi_pSwRWatYXjsQ";

      // 3. 重构提示词，返回 JSON 结构化结果（适配前端类型）
      const prompt = `
        You are an Amazon listing optimization expert. Generate the following content in STRICT JSON format (no extra text):
        {
          "titles": ["title1", "title2", "title3", "title4", "title5"],
          "bulletPoints": [
            {
              "fabeSet": [
                {
                  "feature": "",
                  "advantage": "",
                  "benefit": "",
                  "evidence": "",
                  "combined": ""
                },
                { "feature": "", "advantage": "", "benefit": "", "evidence": "", "combined": "" },
                { "feature": "", "advantage": "", "benefit": "", "evidence": "", "combined": "" },
                { "feature": "", "advantage": "", "benefit": "", "evidence": "", "combined": "" },
                { "feature": "", "advantage": "", "benefit": "", "evidence": "", "combined": "" }
              ]
            },
            { "fabeSet": [/* 第二组5个FABE */] },
            { "fabeSet": [/* 第三组5个FABE */] }
          ],
          "searchTerms": ["term1", "term2", ..., "term10"]
        }

        Product Details:
        - Name: ${productName}
        - Brand: ${brand}
        - Key Selling Points: ${sellingPoints.filter(p => p).join(', ')}
        - Target Category: ${category}

        Rules:
        - Titles: Max 200 characters, follow "Brand + Keyword + Feature + Scenario"
        - Bullet Points: FABE model for each combined field
        - Search Terms: Lowercase, space separated, max 250 bytes
      `;

      // 4. 调用 Gemini API
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" } // 强制返回JSON
          })
        }
      );

      const data = await geminiResponse.json();
      return new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } catch (err) {
      console.error("Proxy error:", err);
      return new Response(JSON.stringify({ error: "Generate failed" }), { status: 500 });
    }
  },
};