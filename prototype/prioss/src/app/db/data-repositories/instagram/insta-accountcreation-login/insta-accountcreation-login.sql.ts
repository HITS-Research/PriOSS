
// INSERT Queries

export const insertIntoInstaSignUpSQL: string = `
    insert into insta_signup_information 
    (username, ip_address, timestamp, email, phone_number, device, color) 
    values (?, ?, ?, ?, ?, ?, ?);
`;

export const insertIntoInstaLoginSQL: string = `
    insert into insta_login_information 
    (ip_address, timestamp, user_agent, type, color, device) 
    values (?, ?, ?, ?, ?, ?);
`;

export const bulkAddInstaLoginBaseSQL: string = `
    insert into insta_login_information 
    (ip_address, timestamp, user_agent, type, color, device)
`;

export const bulkAddInstaLoginValuesSQL: string = `
    select ?, ?, ?, ?, ?, ?
`;

export const bulkAddValueConnectorForLogin: string = `
    union all
`;


export const insertIntoInstaLogoutSQL: string = `
    insert into insta_logout_information 
    (ip_address, timestamp, user_agent, type, color, device)
    values (?, ?, ?, ?, ?, ?);
`;

export const bulkAddInstaLogoutBaseSQL: string = `
    insert into insta_logout_information 
    (ip_address, timestamp, user_agent, type, color, device)
`;

export const bulkAddInstaLogoutValuesSQL: string = `
    select ?, ?, ?, ?, ?, ?
`;

export const bulkAddValueConnectorForLogout: string = `
    union all
`;

// SELECT Queries

export const selectSignUpSQL: string = `
    select username, ip_address, timestamp, email, phone_number, device, color from insta_signup_information;
`;

export const selectLoginSQL: string = `
    select ip_address, timestamp, user_agent, type, color, device from insta_login_information;
`;

export const selectLogoutSQL: string = `
    select ip_address, timestamp, user_agent, type, color, device from insta_logout_information;
`;
