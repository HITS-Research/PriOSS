# Used Packages and Sources

We are using the Capacitor buildtool and a SQLite package created for it to make SQLite run in a browser context. Regular SQLite for Node packages do not work out of the box because they rely on things like file system access that are not available in a browser runtime context.

The Capacitor docs can be found here: https://capacitorjs.com/docs/

They have a page about different storage options: https://capacitorjs.com/docs/guides/storage

We use the SQLite package for capacitor that can be found here: https://github.com/capacitor-community/sqlite

Our implementation of how the SQLite package is used is based on this sample application that the creator of the sqlite package provides on github: 
https://github.com/jepiqueau/angular-sqlite-app-starter/tree/c9d86435acf2e5b21f3a19998d8040b0fb509abf

# Comparison to indexDB

The setup and file-structure is more complex than when using indexDB but the files itself make less complex operations and ensure a better separation of concerns. Additionally the SQL DB makes calculating aggregations and filtering data much easier and heavily increases the speed at which data can be inserted and retrieved from the DB.

# Code & File Structure in the Project

- The Service Selection component (see service-selection.component.ts) has SQL specific file parsing methods for each service, for example parseSpotifyFileToSQLite(). All these methods are asynchronous, to ensure that any further async calls can be made sequential inside this backgroud operation.
- The Service Selection component and visualization components change/access data from the database via different “.repository.ts”-files. Each Repository is tasked with providing a certain point of view of the database, for example one file manages the spot_history table (inserts and different selects) that houses the Spotify listening history.
- The Repository files are located in folders under app/db/data-repositories
- Each Repository file uses string constants from a repository-specific “.sql.ts”-file that sits next to the repository file. The string constants in these SQL files are the different SQL statements or parts of SQL statements that the repository needs. The return values of the repository’s methods that retrieve data from the DB are typed according to model files located under “app/models/”. These model files define simple interfaces that make the structure of the rows returned by the database through the different SQL selects explicit.
- The "app/db/schema.sql.ts"-file defines the sql commands to create all necessary tables and drop (=delete) them. The drop command is used to delete all content of the database when the user wants to read in a new data-download. All create table statements are combined in one string constant and all drop table statements are combined in a second string constant. This enables deleting and recreating the database in an empty state with just two calls.
- Look at spot-history.repository.ts, and spot-history.sql.ts as an example on how to access data. The parseSpotifyFileToSQLite-method inside the Service Selection Component shows an example of how to insert new data into a table from the data-download. Spotify’s listening-time component shows how you can get data from the database and put it into a visualization using a data-repository.