//import { capSQLiteSet } from '@capacitor-community/sqlite';

export const createSchema: string = `
CREATE TABLE IF NOT EXISTS spot_history (
    id INTEGER PRIMARY KEY,
    endTime TEXT NOT NULL,
    artistName TEXT NOT NULL,
    trackName TEXT NOT NULL,
    msPlayed INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS inferences (
    id INTEGER PRIMARY KEY,
    inference TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_personal_info (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    birthdate TEXT NOT NULL,
    gender TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_account_info (
    id INTERGER PRIMARY KEY,
    contact_syncing TEXT NOT NULL,
    first_country_code TEXT NOT NULL,
    has_shared_live_video TEXT NOT NULL,
    last_login TEXT NOT NULL,
    last_logout TEXT NOT NULL,
    first_story_time TEXT NOT NULL,
    last_story_time TEXT NOT NULL,
    first_close_friends_story_time TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_professional_info (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_profile_changes (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    changed TEXT NOT NULL,
    previous_value TEXT NOT NULL,
    new_value TEXT NOT NULL,
    change_date TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_ads_interests (
    id INTEGER PRIMARY KEY,
    interest TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_ads_activity (
    id INTEGER PRIMARY KEY,
    advertiserName TEXT NOT NULL,
    has_data_file_custom_audience TEXT NOT NULL,
    has_remarketing_custom_audience TEXT NOT NULL,
    has_in_person_store_visit TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_ads_clicked (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_ads_viewed (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    timestamp TEXT NOT NULL
);
`;
//PRAGMA user_version = 1;

export const dropSchema: string =`
DROP TABLE IF EXISTS spot_history;
DROP TABLE IF EXISTS insta_personal_info;
DROP TABLE IF EXISTS insta_account_info;
DROP TABLE IF EXISTS insta_professional_info;
DROP TABLE IF EXISTS insta_profile_changes;
DROP TABLE IF EXISTS inferences;
DROP TABLE IF EXISTS insta_ads_activity;
DROP TABLE IF EXISTS insta_ads_interests;
DROP TABLE IF EXISTS insta_ads_clicked;
DROP TABLE IF EXISTS insta_ads_viewed;
`;
