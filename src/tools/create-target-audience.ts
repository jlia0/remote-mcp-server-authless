import { z } from "zod";
import { buildHeaders, buildBody } from "./types";

export const createTargetAudienceSchema = {
	"x-allmedia-api-key": z.string(),
	"x-allmedia-user-id": z.string(),
	"x-allmedia-global-api-key": z.string(),
	"x-allmedia-team": z.string(),
	"x-allmedia-webhook-response-url": z.string(),
	"x-allmedia-tenant": z.string(),
	target_audience_name: z.string(),
	target_audience_prompt: z.string(),
};

export async function createTargetAudience(params: Record<string, any>) {
	const headers = buildHeaders(params);
	const body = buildBody(params);

	const response = await fetch("https://api.allmedia.com/v1/target-audiences", {
		method: "POST",
		headers,
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return {
		content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
	};
}
