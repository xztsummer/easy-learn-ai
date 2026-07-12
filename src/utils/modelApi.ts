/**
 * AI 模型 API 请求工具模块
 * 负责加载和处理模型数据
 */

import { AIModel } from "../types/model";

/**
 * 自动加载 src/data/models/ 目录下所有提供商的 JSON 文件并合并。
 * 新增提供商只需在该目录添加一个 <provider>.json 文件，无需改动此处代码。
 */
function loadAllModels(): AIModel[] {
  const context = import.meta.webpackContext("../data/models", {
    recursive: false,
    regExp: /\.json$/,
  });

  const models: AIModel[] = [];
  for (const key of context.keys()) {
    const mod = context(key) as AIModel[] | { default: AIModel[] };
    const list = Array.isArray(mod) ? mod : mod.default;
    models.push(...list);
  }
  return models;
}

export const modelApiUtils = {
  /**
   * 获取模型列表
   */
  async fetchModelList(): Promise<AIModel[]> {
    try {
      return loadAllModels();
    } catch (error) {
      console.error("Error fetching model list:", error);
      throw new Error("获取模型列表失败，请稍后重试");
    }
  },
};
