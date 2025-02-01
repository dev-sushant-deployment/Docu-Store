export declare class DocuStore {
    private static STORAGE_FACILITY_URL;
    put: (key: string, content: string) => Promise<void>;
    get: (key: string) => Promise<any>;
    delete: (key: string) => Promise<void>;
}
