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

CREATE TABLE IF NOT EXISTS userdata (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    country TEXT,
    birthdate TEXT,
    gender TEXT,
    postalCode INTEGER,
    mobileNumber INTEGER,
    mobileOperator TEXT,
    mobileBrand TEXT,
    creationTime TEXT NOT NULL
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

CREATE TABLE IF NOT EXISTS insta_contacts (
    id INTEGER PRIMARY KEY,
    firstName TEXT NOT NULL,
    surname TEXT NOT NULL,
    contactInformation TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS face_ads_information (
    id INTEGER PRIMARY KEY,
    advertiser_name TEXT NOT NULL,
    has_data_file_custom_audience TEXT NOT NULL,
    has_remarketing_custom_audience TEXT NOT NULL,
    has_in_person_store_visit TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS face_ads_interacted (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    action TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS face_apps_websites (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    added_timestamp TEXT NOT NULL,
    user_app_scoped_id TEXT NOT NULL,
    category TEXT NOT NULL,
    removed_timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS face_off_facebook_activity (
    name TEXT NOT NULL,
    events TEXT NOT NULL,
    id TEXT NOT NULL,
    type TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS face_friend_requests_received (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS face_friend_requests_sent (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS face_friends (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS face_rejected_friend_requests (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS face_removed_friends (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS face_who_you_follow (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS face_inferred_topics (
    id INTEGER PRIMARY KEY,
    topic TEXT NOT NULL
);

`;
//PRAGMA user_version = 1;

/**
 * Facebook table are renamed with a suffix 'face_<table_name>' compared to IndexDB table names.
 * 
 */

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
DROP TABLE IF EXISTS insta_contacts;
DROP TABLE IF EXISTS userdata;
DROP TABLE IF EXISTS face_ads_information;
DROP TABLE IF EXISTS face_ads_interacted;
DROP TABLE IF EXISTS face_apps_websites;
DROP TABLE IF EXISTS face_off_facebook_activity;
DROP TABLE IF EXISTS face_friend_requests_received;
DROP TABLE IF EXISTS face_friend_requests_sent;
DROP TABLE IF EXISTS face_friends;
DROP TABLE IF EXISTS face_rejected_friend_requests;
DROP TABLE IF EXISTS face_removed_friends;
DROP TABLE IF EXISTS face_who_you_follow;
DROP TABLE IF EXISTS face_inferred_topics;
`;
