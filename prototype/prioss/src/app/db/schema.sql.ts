//import { capSQLiteSet } from '@capacitor-community/sqlite';

export const createSchema = `
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
    id INTEGER PRIMARY KEY,
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
    business_information TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_based_in (
    id INTEGER PRIMARY KEY,
    account_based_in TEXT NOT NULL
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

CREATE TABLE IF NOT EXISTS insta_user_searches (
    id INTEGER PRIMARY KEY,
    search TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_keyword_searches (
    id INTEGER PRIMARY KEY,
    search TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_tag_searches (
    id INTEGER PRIMARY KEY,
    search TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_signup_information (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    ip_address TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    device TEXT NOT NULL,
    color TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_login_information (
    id INTEGER PRIMARY KEY,
    ip_address TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    user_agent TEXT NOT NULL,
    type TEXT NOT NULL,
    color TEXT NOT NULL,
    device TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_logout_information (
    id INTEGER PRIMARY KEY,
    ip_address TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    user_agent TEXT NOT NULL,
    type TEXT NOT NULL,
    color TEXT NOT NULL,
    device TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_liked_comments (
    id INTEGER PRIMARY KEY,
    user TEXT NOT NULL,
    href_link TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_liked_posts (
    id INTEGER PRIMARY KEY,
    user TEXT NOT NULL,
    href_link TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_contacts (
    id INTEGER PRIMARY KEY,
    firstName TEXT NOT NULL,
    surname TEXT NOT NULL,
    contactInformation TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_follower_info (
    id INTEGER PRIMARY KEY,
    instaProfileURL TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    instaAccountName TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_following_info (
    id INTEGER PRIMARY KEY,
    instaProfileURL TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    instaAccountName TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_blocked_info (
    id INTEGER PRIMARY KEY,
    instaAccountName TEXT NOT NULL,
    instaProfileURL TEXT NOT NULL,
    timestamp INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_shopping (
    id INTEGER PRIMARY KEY,
    merchantName TEXT NOT NULL,
    productName TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_shopping_wishlist (
    id INTEGER PRIMARY KEY,
    merchantName TEXT NOT NULL,
    productName TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_recent_follow_info (
    id INTEGER PRIMARY KEY,
    instaProfileURL TEXT NOT NULL,
    instaAccountName TEXT NOT NULL,
    timestamp INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_pending_follow_request_info (
    id INTEGER PRIMARY KEY,
    instaProfileURL TEXT NOT NULL,
    instaAccountName TEXT NOT NULL,
    timestamp INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_recently_unfollowed_accounts_info (
    id INTEGER PRIMARY KEY,
    instaProfileURL TEXT NOT NULL,
    instaAccountName TEXT NOT NULL,
    timestamp INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_removed_suggestion_info (
    id INTEGER PRIMARY KEY,
    instaProfileURL TEXT NOT NULL,
    instaAccountName TEXT NOT NULL,
    timestamp INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_received_follow_request_info (
    id INTEGER PRIMARY KEY,
    instaProfileURL TEXT NOT NULL,
    instaAccountName TEXT NOT NULL,
    timestamp INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_your_topics(
    id INTEGER PRIMARY KEY,
    topic TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_chat_data_info(
    id INTEGER PRIMARY KEY,
    chat TEXT NOT NULL,
    yourMessages INTEGER NOT NULL,
    monday INTEGER NOT NULL,
    tuesday INTEGER NOT NULL,
    wednesday INTEGER NOT NULL,
    thursday INTEGER NOT NULL,
    friday INTEGER NOT NULL,
    saturday INTEGER NOT NULL,
    sunday INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS insta_chat_partner_data_info(
    id INTEGER PRIMARY KEY,
    sender TEXT NOT NULL,
    messages INTEGER NOT NULL,
    avg REAL NOT NULL,
    text INTEGER NOT NULL,
    share INTEGER NOT NULL,
    audio INTEGER NOT NULL,
    photos INTEGER NOT NULL,
    monday INTEGER NOT NULL,
    tuesday INTEGER NOT NULL,
    wednesday INTEGER NOT NULL,
    thursday INTEGER NOT NULL,
    friday INTEGER NOT NULL,
    saturday INTEGER NOT NULL,
    sunday INTEGER NOT NULL,
    chat_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS face_ads_interacted (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    action TEXT NOT NULL,
    timestamp INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS face_apps_websites (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    added_timestamp INTEGER,
    user_app_scoped_id INTEGER,
    category TEXT NOT NULL,
    removed_timestamp INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS face_off_facebook_activity (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    events TEXT NOT NULL,
    type TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS face_friends (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    type TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS face_inferred_topics (
    id INTEGER PRIMARY KEY,
    topic TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS face_login_locations (
    id INTEGER PRIMARY KEY,
    location TEXT NOT NULL,
    device TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS face_login_logouts (
    id INTEGER PRIMARY KEY,
    action TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS face_account_status_changes (
    id INTEGER PRIMARY KEY,
    status TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS face_account_activity (
    id INTEGER PRIMARY KEY,
    action TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    city TEXT NOT NULL,
    region TEXT NOT NULL,
    country TEXT NOT NULL,
    site_name TEXT 
);
CREATE TABLE IF NOT EXISTS face_address_book (
    id INTEGER PRIMARY KEY,
    name TEXT ,
    contact_point TEXT,
    created_timestamp INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS face_search_history (
    id INTEGER PRIMARY KEY,
    text TEXT,
    timestamp INTEGER
);
CREATE TABLE IF NOT EXISTS face_messages (
    id INTEGER PRIMARY KEY,
    name TEXT,
    timestamp NUMBER,
    uri TEXT
);
CREATE TABLE IF NOT EXISTS face_group_messages (
    id INTEGER PRIMARY KEY,
    name TEXT,
    value STRING
);

CREATE TABLE IF NOT EXISTS face_posts (
    id INTEGER PRIMARY KEY,
    timestamp INTEGER,
    title STRING,
    post STRING
);
CREATE TABLE IF NOT EXISTS face_groups (
    id INTEGER PRIMARY KEY,
    name TEXT,
    timestamp TEXT
);

CREATE TABLE IF NOT EXISTS face_events (
    id INTEGER PRIMARY KEY,
    name TEXT,
    start_timestamp TEXT,
    end_timestamp TEXT
);

`;
//PRAGMA user_version = 1;

/**
 * Facebook table are renamed with a suffix 'face_<table_name>' compared to IndexDB table names.
 * 
 */

export const dropSchema =`
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
DROP TABLE IF EXISTS insta_user_searches;
DROP TABLE IF EXISTS insta_keyword_searches;
DROP TABLE IF EXISTS insta_tag_searches;
DROP TABLE IF EXISTS insta_signup_information;
DROP TABLE IF EXISTS insta_login_information;
DROP TABLE IF EXISTS insta_logout_information;
DROP TABLE IF EXISTS insta_liked_comments;
DROP TABLE IF EXISTS insta_liked_posts;
DROP TABLE IF EXISTS insta_contacts;
DROP TABLE IF EXISTS userdata;
DROP TABLE IF EXISTS insta_follower_info;
DROP TABLE IF EXISTS insta_following_info;
DROP TABLE IF EXISTS insta_blocked_info;
DROP TABLE IF EXISTS insta_shopping;
DROP TABLE IF EXISTS insta_shopping_wishlist;
DROP TABLE IF EXISTS insta_recent_follow_info;
DROP TABLE IF EXISTS insta_pending_follow_request_info;
DROP TABLE IF EXISTS insta_recently_unfollowed_accounts_info;
DROP TABLE IF EXISTS insta_removed_suggestion_info;
DROP TABLE IF EXISTS insta_received_follow_request_info;
DROP TABLE IF EXISTS insta_your_topics;
DROP TABLE IF EXISTS insta_chat_data_info;
DROP TABLE IF EXISTS insta_chat_partner_data_info;
DROP TABLE IF EXISTS face_ads_interacted;
DROP TABLE IF EXISTS face_apps_websites;
DROP TABLE IF EXISTS face_off_facebook_activity;
DROP TABLE IF EXISTS face_friends;
DROP TABLE IF EXISTS face_inferred_topics;
DROP TABLE IF EXISTS face_login_locations;
DROP TABLE IF EXISTS face_login_logouts;
DROP TABLE IF EXISTS face_account_status_changes;
DROP TABLE IF EXISTS face_account_activity;
DROP TABLE IF EXISTS face_address_book;
DROP TABLE IF EXISTS face_search_history;
DROP TABLE IF EXISTS face_posts;
DROP TABLE IF EXISTS face_groups;
DROP TABLE IF EXISTS face_events;
DROP TABLE IF EXISTS face_messages;
DROP TABLE IF EXISTS face_group_messages;
`;
