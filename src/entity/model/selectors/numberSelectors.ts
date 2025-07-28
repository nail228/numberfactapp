import type {StateSchema} from "../../../app/providers/store/config/StateSchema.ts";

export const getNumberFactState = (state: StateSchema) => state.numberFacts;
export const getNumberFactSettings = (state: StateSchema) => state.numberFacts.settings;
