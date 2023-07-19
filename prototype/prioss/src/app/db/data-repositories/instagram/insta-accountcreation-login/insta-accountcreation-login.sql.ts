
// INSERT Queries

export const insertIntoInstaSignUpSQL = `
    insert into insta_signup_information 
    (username, ip_address, timestamp, email, phone_number, device, color) 
    values (?, ?, ?, ?, ?, ?, ?);
`;

export const insertIntoInstaLoginSQL = `
    insert into insta_login_information 
    (ip_address, timestamp, user_agent, type, color, device) 
    values (?, ?, ?, ?, ?, ?);
`;

export const bulkAddInstaLoginBaseSQL = `
    insert into insta_login_information 
    (ip_address, timestamp, user_agent, type, color, device)
`;

export const bulkAddInstaLoginValuesSQL = `
    select ?, ?, ?, ?, ?, ?
`;

export const bulkAddValueConnectorForLogin = `
    union all
`;


export const insertIntoInstaLogoutSQL = `
    insert into insta_logout_information 
    (ip_address, timestamp, user_agent, type, color, device)
    values (?, ?, ?, ?, ?, ?);
`;

export const bulkAddInstaLogoutBaseSQL = `
    insert into insta_logout_information 
    (ip_address, timestamp, user_agent, type, color, device)
`;

export const bulkAddInstaLogoutValuesSQL = `
    select ?, ?, ?, ?, ?, ?
`;

export const bulkAddValueConnectorForLogout = `
    union all
`;

// SELECT Queries

export const selectSignUpSQL = `
    select username, ip_address, timestamp, email, phone_number, device, color from insta_signup_information;
`;

export const selectLoginSQL = `
    select ip_address, timestamp, user_agent, type, color, device from insta_login_information;
`;

export const selectLogoutSQL = `
    select ip_address, timestamp, user_agent, type, color, device from insta_logout_information;
`;
