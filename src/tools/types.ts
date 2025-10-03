export interface AllmediaHeaders {
	"x-allmedia-api-key"?: string;
	"x-allmedia-user-id"?: string;
	"x-allmedia-global-api-key"?: string;
	"x-allmedia-team"?: string;
	"x-allmedia-conversation-id"?: string;
	"x-allmedia-webhook-response-url"?: string;
	"x-allmedia-tenant"?: string;
}

export function buildHeaders(params: Record<string, any>): Record<string, string> {
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
	};

	const headerKeys = [
		"x-allmedia-api-key",
		"x-allmedia-user-id",
		"x-allmedia-global-api-key",
		"x-allmedia-team",
		"x-allmedia-conversation-id",
		"x-allmedia-webhook-response-url",
		"x-allmedia-tenant",
	];

	for (const key of headerKeys) {
		if (params[key]) {
			headers[key] = params[key];
		}
	}

	return headers;
}

export function buildBody(params: Record<string, any>): Record<string, any> {
	const body: Record<string, any> = {};
	const headerKeys = [
		"x-allmedia-api-key",
		"x-allmedia-user-id",
		"x-allmedia-global-api-key",
		"x-allmedia-team",
		"x-allmedia-conversation-id",
		"x-allmedia-webhook-response-url",
		"x-allmedia-tenant",
	];

	for (const [key, value] of Object.entries(params)) {
		if (!headerKeys.includes(key) && value !== undefined) {
			body[key] = value;
		}
	}

	return body;
}
