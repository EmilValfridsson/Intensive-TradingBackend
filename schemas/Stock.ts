import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  symbol: z.string().min(1, { message: "symbol is required" }),
  date: z.string().min(1, { message: "date is required" }),
  high: z
    .number()
    .gte(1, { message: "High must be greater than or equal to 1" }),
  low: z.number().gte(1, { message: "Low must be greater than or equal to 1" }),
  close: z
    .number()
    .gte(1, { message: "Close must be greater than or equal to 1" }),
  volume: z
    .number()
    .gte(1, { message: "Volume must be greater than or equal to 1" }),
  isFavored: z.boolean().optional(),
});

export type FoodData = z.infer<typeof schema>;

export function validate(body: FoodData) {
  return schema.safeParse(body);
}
