import type {NumberFactResponse} from "../../../shared/api/types.ts";

export interface NumberFactEntity {
    number: string;
    type: string;
    fact: NumberFactResponse;
}

export interface NumberFactState {
    number: string;
    type: string;
    isRandom: boolean;
    result: NumberFactResponse | null;
    error: string | null;
    currentPage: 'home' | 'result';
    lastQuery: NumberFactEntity | null;
    settings: {
        useFragment: boolean;
        notFoundAction: 'default' | 'floor' | 'ceil';
        minRange?: number;
        maxRange?: number;
    };
}