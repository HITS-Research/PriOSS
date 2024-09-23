export enum AppType
{
    Instagram = "instagram",
    Facebook = "facebook",
    Spotify = "spotify",
    Youtube = "youtube",
    //we use this enum in indexedDB.state.ts, so thats why there is this value
    FacebookMediaFiles = "facebookMediaFiles",
    //we use this enum in indexedDB.state.ts, so thats why there is this value
    SelectedService = "selectedService"
}
