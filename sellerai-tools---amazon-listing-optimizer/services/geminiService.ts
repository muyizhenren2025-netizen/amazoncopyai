import { ProductInput, GeneratedContent } from "../types";

// 替换为你部署的 Cloudflare Gemini Proxy Worker 域名
const GEMINI_PROXY_WORKER_URL = "https://gemini-proxy.your-cloudflare-username.workers.dev";

/**
 * 调用 Cloudflare Worker 生成亚马逊Listing内容（隐藏API Key）
 * @param input 产品输入参数
 * @returns 生成的标题/卖点/关键词
 */
export const generateListingData = async (input: ProductInput): Promise<GeneratedContent> => {
  // 输入参数校验（保留原有逻辑）
  if (!input.name?.trim()) throw new Error("Product name is required");
  if (!input.category?.trim()) throw new Error("Product category is required");

  try {
    // 调用 Cloudflare Worker 代理（替代直接调用 Gemini API）
    const response = await fetch(GEMINI_PROXY_WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 可选：加简单鉴权，防止 Worker 被恶意调用
        "X-Worker-Auth": "your-random-secret-key" // 后续在 Worker 里也加这个校验
      },
      body: JSON.stringify({
        productName: input.name,
        sellingPoints: input.sellingPoints,
        category: input.category,
        brand: input.brand || "Generic" // 传递品牌参数到 Worker
      })
    });

    if (!response.ok) throw new Error(`Worker request failed: ${response.statusText}`);
    
    // 解析 Worker 返回的 Gemini 响应
    const geminiResponse = await response.json();
    const rawContent = geminiResponse.candidates[0].content.parts[0].text;
    
    // 适配原有返回格式（解析为 GeneratedContent 类型）
    // 注意：需和 Worker 里的提示词返回格式匹配，确保结构一致
    const parsedContent = JSON.parse(rawContent);
    return parsedContent as GeneratedContent;
  } catch (error) {
    console.error("Failed to generate listing data:", error);
    throw new Error("Failed to generate listing content, please try again");
  }
};
