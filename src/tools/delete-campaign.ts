import { z } from "zod";
import { buildHeaders, buildBody } from "./types";

export const deleteCampaignSchema = {
	"x-allmedia-api-key": z.string(),
	"x-allmedia-user-id": z.string(),
	"x-allmedia-global-api-key": z.string(),
	"x-allmedia-team": z.string(),
	"x-allmedia-conversation-id": z.string(),
	"x-allmedia-webhook-response-url": z.string(),
	"x-allmedia-tenant": z.string(),
	campaign_name: z.string(),
	campaign_id: z.string(),
	delete_contents: z.enum(["true", "false"]),
};

export async function deleteCampaign(params: Record<string, any>) {
	const headers = buildHeaders(params);
	const body = buildBody(params);

	const response = await fetch("https://api.allmedia.com/v1/campaigns/delete", {
		method: "DELETE",
		headers,
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return {
		content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
	};
}
