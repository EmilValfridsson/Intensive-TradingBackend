import { z } from "zod";

const schema = z.object({
  ticker: z.string().min(1, { message: "ticker is required" }),
});

export type StockData = z.infer<typeof schema>;

export function validate(body: StockData) {
  return schema.safeParse(body);
}
