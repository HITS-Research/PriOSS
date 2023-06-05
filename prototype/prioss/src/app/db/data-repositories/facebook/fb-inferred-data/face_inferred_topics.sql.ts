export const bulkAddFaceInferredTopicsBaseSQL: string = `
  insert into face_inferred_topics 
  (topic)
`;

export const bulkAddFaceInferredTopicsValuesSQL: string = `
  select ?
`;

export const bulkAddValueConnector: string = `
union all
`;

export const selectAllInferredTopics: string = `
 select id,
        topic
  from face_inferred_topics;
`;