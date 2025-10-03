import { z } from "zod";
import { buildHeaders, buildBody } from "./types";

export const createPostTypeSchema = {
	"x-allmedia-api-key": z.string(),
	"x-allmedia-user-id": z.string(),
	"x-allmedia-global-api-key": z.string(),
	"x-allmedia-team": z.string(),
	"x-allmedia-webhook-response-url": z.string(),
	"x-allmedia-tenant": z.string(),
	post_type_max_length_words: z.number(),
	post_type_min_length_words: z.number(),
	post_type_name: z.string(),
	post_type_description: z.string(),
	post_type_content_structure: z.string(),
	post_type_example_posts: z.string(),
};

export async function createPostType(params: Record<string, any>) {
	const headers = buildHeaders(params);
	const body = buildBody(params);

	const response = await fetch("https://api.allmedia.com/v1/post-types", {
		method: "POST",
		headers,
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return {
		content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
	};
}
