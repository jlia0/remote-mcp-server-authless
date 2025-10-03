import { z } from "zod";
import { buildHeaders, buildBody } from "./types";

export const createStorySchema = {
  "x-allmedia-api-key": z.string(),
  "x-allmedia-user-id": z.string(),
  "x-allmedia-global-api-key": z.string(),
  "x-allmedia-team": z.string(),
  "x-allmedia-conversation-id": z.string(),
  "x-allmedia-webhook-response-url": z.string(),
  "x-allmedia-tenant": z.string(),
  content_plan: z.string(),
  campaign_id: z.string(),
};

export async function createStory(params: Record<string, any>) {
  const headers = buildHeaders(params);
  const body = buildBody(params);

  console.log("headers", headers);
  console.log("body", body);

  const response = await fetch("https://api.allmedia.com/v1/stories", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
  };
}
