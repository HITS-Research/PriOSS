export default interface YouTubeUserPlaylistData{
  playlistName:string;
  videos:YouTubeUserPlaylistVideoData[];
}


interface YouTubeUserPlaylistVideoData{
  videoId:string;
  timestamp:string;
}
