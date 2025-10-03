import { z } from "zod";

export const validateEditorialPlanSchema = {
	editorialPlan: z.string(),
};

export async function validateEditorialPlan(params: Record<string, any>) {
	const { editorialPlan } = params;

	const response = await fetch("https://api.allmedia.com/v1/editorial-plan/validate", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ editorialPlan }),
	});

	const data = await response.json();
	return {
		content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
	};
}
