import { z } from "zod";
import { buildHeaders, buildBody } from "./types";

export const createCampaignSchema = {
	"x-allmedia-api-key": z.string().optional(),
	"x-allmedia-user-id": z.string().optional(),
	"x-allmedia-global-api-key": z.string().optional(),
	"x-allmedia-team": z.string().optional(),
	"x-allmedia-conversation-id": z.string().optional(),
	"x-allmedia-webhook-response-url": z.string().optional(),
	"x-allmedia-tenant": z.string().optional(),
	campaign_name: z.string(),
	campaign_description: z.string(),
};

export async function createCampaign(params: Record<string, any>) {
	const headers = buildHeaders(params);
	const body = buildBody(params);

	const response = await fetch("https://api.allmedia.com/v1/campaigns", {
		method: "POST",
		headers,
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return {
		content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
	};
}
