/**
 * @example {
  "uri": "https://www.facebook.com/redacted",
  "creation_timestamp": 1473747338,
  "media_metadata": {
    "photo_metadata": {
      "exif_data": [
        {
          "upload_ip": "46.223.1.60",
          "taken_timestamp": 1473747340
        }
      ]
    }
  },
  "title": "Titelbilder"
} */
export interface PostPhotoModel {
  uri: string;
  creation_timestamp: number;
  media_metadata: MediaMetadata;
  title: string;
}
export interface MediaMetadata {
  photo_metadata: PhotoMetadata;
}
export interface PhotoMetadata {
  exif_data: ExifData[];
}
export interface ExifData {
  upload_ip: string;
  taken_timestamp: number;
  orientation?: number;
}
