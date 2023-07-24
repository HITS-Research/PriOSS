export const bulkAddFaceInferredTopicsBaseSQL = `
  insert into face_inferred_topics 
  (topic)
`;

export const bulkAddFaceInferredTopicsValuesSQL = `
  select ?
`;

export const bulkAddValueConnector = `
union all
`;

export const selectAllInferredTopics = `
 select id,
        topic
  from face_inferred_topics;
`;