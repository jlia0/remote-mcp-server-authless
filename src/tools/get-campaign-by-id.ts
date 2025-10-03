import { z } from "zod";
import { buildHeaders, buildBody } from "./types";

export const getCampaignByIdSchema = {
	"x-allmedia-api-key": z.string(),
	"x-allmedia-user-id": z.string(),
	"x-allmedia-global-api-key": z.string(),
	"x-allmedia-team": z.string(),
	"x-allmedia-conversation-id": z.string(),
	"x-allmedia-webhook-response-url": z.string(),
	"x-allmedia-tenant": z.string(),
	campaign_id: z.string(),
};

export async function getCampaignById(params: Record<string, any>) {
	const headers = buildHeaders(params);
	const { campaign_id } = params;

	const response = await fetch(`https://api.allmedia.com/v1/campaigns/${campaign_id}`, {
		method: "GET",
		headers,
	});

	const data = await response.json();
	return {
		content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
	};
}
