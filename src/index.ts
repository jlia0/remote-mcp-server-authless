import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createStory, createStorySchema } from "./tools/create-story";
import {
  getKnowledgeStores,
  getKnowledgeStoresSchema,
} from "./tools/get-knowledge-stores";
import {
  getCampaignById,
  getCampaignByIdSchema,
} from "./tools/get-campaign-by-id";
import { createCampaign, createCampaignSchema } from "./tools/create-campaign";
import { deleteCampaign, deleteCampaignSchema } from "./tools/delete-campaign";
import {
  validateEditorialPlan,
  validateEditorialPlanSchema,
} from "./tools/validate-editorial-plan";
import { createChannel, createChannelSchema } from "./tools/create-channel";
import { createPostType, createPostTypeSchema } from "./tools/create-post-type";
import {
  createTargetAudience,
  createTargetAudienceSchema,
} from "./tools/create-target-audience";
import {
  createBrandVoice,
  createBrandVoiceSchema,
} from "./tools/create-brand-voice";
import { listPosts, listPostsSchema } from "./tools/list-posts";
import {
  createKnowledgeStore,
  createKnowledgeStoreSchema,
} from "./tools/create-knowledge-store";

// Define our MCP agent with tools
export class MyMCP extends McpAgent {
  server = new McpServer({
    name: "ALLMEDIA API Server",
    version: "1.0.0",
  });

  async init() {
    // Register all ALLMEDIA tools
    this.server.tool("allmedia_create_story", createStorySchema, createStory);
    this.server.tool(
      "allmedia_get_knowledge_stores",
      getKnowledgeStoresSchema,
      getKnowledgeStores
    );
    this.server.tool(
      "allmedia_get_campaign_by_id",
      getCampaignByIdSchema,
      getCampaignById
    );
    this.server.tool(
      "allmedia_create_campaign",
      createCampaignSchema,
      createCampaign
    );
    this.server.tool(
      "allmedia_delete_campaign",
      deleteCampaignSchema,
      deleteCampaign
    );
    this.server.tool(
      "allmedia_validate_editorial_plan",
      validateEditorialPlanSchema,
      validateEditorialPlan
    );
    this.server.tool(
      "allmedia_create_channel",
      createChannelSchema,
      createChannel
    );
    this.server.tool(
      "allmedia_create_post_type",
      createPostTypeSchema,
      createPostType
    );
    this.server.tool(
      "allmedia_create_target_audience",
      createTargetAudienceSchema,
      createTargetAudience
    );
    this.server.tool(
      "allmedia_create_brand_voice",
      createBrandVoiceSchema,
      createBrandVoice
    );
    this.server.tool("allmedia_list_posts", listPostsSchema, listPosts);
    this.server.tool(
      "allmedia_create_knowledge_store",
      createKnowledgeStoreSchema,
      createKnowledgeStore
    );
  }
}

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    if (url.pathname === "/sse" || url.pathname === "/sse/message") {
      return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
    }

    if (url.pathname === "/mcp") {
      return MyMCP.serve("/mcp").fetch(request, env, ctx);
    }

    return new Response("Not found", { status: 404 });
  },
};
