import { z } from "zod";
import { buildHeaders, buildBody } from "./types";

export const createBrandVoiceSchema = {
	"x-allmedia-api-key": z.string(),
	"x-allmedia-user-id": z.string(),
	"x-allmedia-global-api-key": z.string(),
	"x-allmedia-team": z.string(),
	"x-allmedia-webhook-response-url": z.string(),
	"x-allmedia-tenant": z.string(),
	brand_voice_role: z.string(),
	brand_voice_tonality: z.string(),
	brand_voice_nogo_words: z.string(),
	brand_voice_emoji_usage: z.string(),
	brand_voice_hashtag_usage: z.string(),
	brand_voice_key_topics: z.string(),
	brand_voice_name: z.string(),
	brand_voice_style_of_voice: z.string(),
};

export async function createBrandVoice(params: Record<string, any>) {
	const headers = buildHeaders(params);
	const body = buildBody(params);

	const response = await fetch("https://api.allmedia.com/v1/brand-voices", {
		method: "POST",
		headers,
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return {
		content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
	};
}
