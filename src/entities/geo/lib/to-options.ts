import type { ComboOption } from "@shared/ui/form";
import type { Province, District, Ward } from "../model/types";

export const provincesToOptions = (xs: Province[]): ComboOption[] =>
  xs.map((x) => ({ value: String(x.code), label: x.name }));

export const districtsToOptions = (xs: District[]): ComboOption[] =>
  xs.map((x) => ({ value: String(x.code), label: x.name }));

export const wardsToOptions = (xs: Ward[]): ComboOption[] =>
  xs.map((x) => ({ value: String(x.code), label: x.name }));
