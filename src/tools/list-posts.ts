import { z } from "zod";
import { buildHeaders, buildBody } from "./types";

export const listPostsSchema = {
	"x-allmedia-api-key": z.string().optional(),
	"x-allmedia-user-id": z.string().optional(),
	"x-allmedia-global-api-key": z.string().optional(),
	"x-allmedia-team": z.string().optional(),
	"x-allmedia-webhook_response_url": z.string().optional(),
	"x-allmedia-tenant": z.string().optional(),
	post_status: z.enum(["pending", "publishing", "published"]).optional(),
	post_limit: z.string().optional(),
	post_from_date: z.string().optional(),
	post_to_date: z.string().optional(),
};

export async function listPosts(params: Record<string, any>) {
	const headers = buildHeaders(params);
	const body = buildBody(params);

	const response = await fetch("https://api.allmedia.com/v1/posts", {
		method: "POST",
		headers,
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return {
		content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
	};
}
