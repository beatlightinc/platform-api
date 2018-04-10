declare class OutroAPI {
    static authToken: string;
    static baseURL: string;
    static initialize(authToken: string): void;
    static setBaseURL(baseURL: string): void;
    static post(endpoint: string, payload: any): Promise<any>;
    static form(endpoint: string, payload: FormData): Promise<any>;
    static get(endpoint: string): Promise<any>;
}
export default OutroAPI;
