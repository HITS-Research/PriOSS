import { PostPhotoModel } from './Photo';

/**
 * @example {
  "name": "Titelbilder",
  "photos": [
    {
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
    }
  ],
  "cover_photo": {
    "uri": "https://www.facebook.com/redacted",
    "creation_timestamp": 1583583134,
    "media_metadata": {
      "photo_metadata": {
        "exif_data": [
          {
            "upload_ip": "2001:16b8:1855:4500:8913:aaaa:ef00:e598",
            "taken_timestamp": 1583583136,
            "orientation": 1
          }
        ]
      }
    },
    "title": "Titelbilder"
  },
  "last_modified_timestamp": 1583583136,
  "description": ""
}
 */
export interface AlbumModel {
  name: string;
  photos: PostPhotoModel[];
  cover_photo: PostPhotoModel;
  last_modified_timestamp: number;
  description: string;
}
