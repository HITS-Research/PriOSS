export interface FacebookIndexedDBMedia{
    id: number;
    data_export_file: string;
    thread_path: string;
    file_type: string;
    file: Blob;
    blobURL?: string;
}