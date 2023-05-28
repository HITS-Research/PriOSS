export const bulkAddInferencesBaseSQL: string = `
  insert into inferences 
  (inference)
`;

export const bulkAddInferencesValuesSQL: string = `
  select ?
`;

export const bulkAddValueConnector: string = `
union all
`;

export const selectAllInferences: string = `
 select id,
        inference
   from inferences;
`;