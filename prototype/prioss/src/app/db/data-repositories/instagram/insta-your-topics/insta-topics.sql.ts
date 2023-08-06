export const insertIntoinstaTopicsSQL = `
insert into insta_your_topics
(topic)
values 
(?, ?, ?);
`;

export const bulkAddinstaTopicsBaseSQL = `
insert into insta_your_topics 
(topic)
`;

export const bulkAddinstaTopicsValuesSQL = `
select ?, ?, ?
`;

export const bulkAddValueConnectorForTopics = `
union all
`;

export const selectTopicsSQL=`
select topic 
  from insta_your_topics;
`;