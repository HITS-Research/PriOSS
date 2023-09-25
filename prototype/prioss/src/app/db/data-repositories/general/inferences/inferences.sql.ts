export const bulkAddInferencesBaseSQL = `
  insert into inferences 
  (inference)
`;

export const bulkAddInferencesValuesSQL = `
  select ?
`;

export const bulkAddValueConnector = `
union all
`;

export const selectAllInferences = `
 select id,
        inference
   from inferences;
`;