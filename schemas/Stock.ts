import { z } from "zod";

const schema = z.object({
  ticker: z.string().min(1, { message: "ticker is required" }),
});

export type FoodData = z.infer<typeof schema>;

export function validate(body: FoodData) {
  return schema.safeParse(body);
}
