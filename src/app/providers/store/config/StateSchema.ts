import type {NumberFactResponse} from "../../../../shared/api/types.ts";

export interface StateSchema {
    numberFacts: NumberFactSchema;
    numbersApi: any;
}

export interface NumberFactSchema {
    number: string;
    type: string;
    isRandom: boolean;
    result: NumberFactResponse | null;
    error: string | null;
    currentPage: 'home' | 'result';
    lastQuery: {
        number: string;
        type: string;
        fact: NumberFactResponse;
    } | null;
    settings: {
        useFragment: boolean;
        notFoundAction: 'default' | 'floor' | 'ceil';
        minRange?: number;
        maxRange?: number;
    };
}