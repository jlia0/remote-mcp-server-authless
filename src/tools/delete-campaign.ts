import { z } from "zod";
import { buildHeaders, buildBody } from "./types";

export const deleteCampaignSchema = {
	"x-allmedia-api-key": z.string().optional(),
	"x-allmedia-user-id": z.string().optional(),
	"x-allmedia-global-api-key": z.string().optional(),
	"x-allmedia-team": z.string().optional(),
	"x-allmedia-conversation-id": z.string().optional(),
	"x-allmedia-webhook-response-url": z.string().optional(),
	"x-allmedia-tenant": z.string().optional(),
	campaign_name: z.string().optional(),
	campaign_id: z.string().optional(),
	delete_contents: z.enum(["true", "false"]).optional(),
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
