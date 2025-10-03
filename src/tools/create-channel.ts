import { z } from "zod";
import { buildHeaders, buildBody } from "./types";

export const createChannelSchema = {
	"x-allmedia-api-key": z.string(),
	"x-allmedia-user-id": z.string(),
	"x-allmedia-global-api-key": z.string(),
	"x-allmedia-team": z.string(),
	"x-allmedia-webhook-response-url": z.string(),
	"x-allmedia-tenant": z.string(),
	channel_name: z.string(),
	channel_language: z.string(),
	channel_ai_model_temperature: z.enum(["conservative", "normal", "very creative"]),
	channel_ai_model: z.string(),
	channel_target_audience_ids: z.array(z.string()),
	channel_brand_voice_id: z.string(),
	channel_post_type_id: z.string(),
	channel_knowledge_store_ids: z.array(z.string()),
	channel_description: z.string(),
};

export async function createChannel(params: Record<string, any>) {
	const headers = buildHeaders(params);
	const body = buildBody(params);

	const response = await fetch("https://api.allmedia.com/v1/channels", {
		method: "POST",
		headers,
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return {
		content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
	};
}
