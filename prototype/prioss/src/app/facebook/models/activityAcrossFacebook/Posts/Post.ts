

export interface PostModel {
    timestamp:    number;
    attachments?: Attachment[];
    data:         PostDatum[];
    title?:       string;
    tags?:        Tag[];
}

export interface Attachment {
    data: AttachmentDatum[];
}

export interface AttachmentDatum {
    external_context?: ExternalContext;
    media?:            Media;
    place?:            Place;
}

export interface ExternalContext {
    url:   string;
    name?: string;
}

export interface Media {
    uri:                string;
    creation_timestamp: number;
    media_metadata:     MediaMetadata;
    title:              string;
    description:        string;
}

export interface MediaMetadata {
    photo_metadata: PhotoMetadata;
}

export interface PhotoMetadata {
    exif_data: ExifDatum[];
}

export interface ExifDatum {
    upload_ip:       string;
    taken_timestamp: number;
}

export interface Place {
    name:       string;
    coordinate: Coordinate;
    address:    string;
    url?:       string;
}

export interface Coordinate {
    latitude:  number;
    longitude: number;
}

export interface PostDatum {
    post?:             string;
    update_timestamp?: number;
}

export interface Tag {
    name: string;
}
