export const insertIntoFacebookInferredTopicSQL: string = `
  insert into face_inferred_topics
  (inferred_topics_v2)
`;

export const selectAllInferredTopics: string = `
 select *
   from face_inferred_topics;
`;

export const bulkAddValueConnector: string = `
union all
`;