export interface NumberFactResponse {
    text: string;
    found: boolean;
    number: number;
    type: string;
    date?: string;
    year?: string;
}

export interface NumberFactRequest {
    number: string;
    type: string;
    fragment?: boolean;
    notfound?: 'default' | 'floor' | 'ceil';
    min?: number;
    max?: number;
}