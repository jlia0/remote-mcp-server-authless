import { z } from "zod";
import { buildHeaders, buildBody } from "./types";

export const getKnowledgeStoresSchema = {
	"x-allmedia-api-key": z.string().optional(),
	"x-allmedia-user-id": z.string().optional(),
	"x-allmedia-global-api-key": z.string().optional(),
	"x-allmedia-team": z.string().optional(),
	"x-allmedia-conversation-id": z.string().optional(),
	"x-allmedia-webhook-response-url": z.string().optional(),
	"x-allmedia-tenant": z.string().optional(),
};

export async function getKnowledgeStores(params: Record<string, any>) {
	const headers = buildHeaders(params);

	const response = await fetch("https://api.allmedia.com/v1/knowledge-stores", {
		method: "GET",
		headers,
	});

	const data = await response.json();
	return {
		content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
	};
}
