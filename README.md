## Commands

`npx prisma db pull` to pull database tables into your schema file.

`npx prisma generate` to sync client to current schema in the local schema file; do this before you do CRUD SQL operation via prisma.

`npx ts-node <file location>` to execute CRUD operation code in the file.

`npx prisma migrate dev --name <any migration name>` to migrate your schema.prisma file to target database.
Because prisma make a shadow database (temporary) every time to make sure database is sync, use `npx prisma database push` if you don’t have right to make another database (no benefit from shadow database)

`npx prisma studio` to start prisma studio, the visual editor UI for database.

## Resoruces

[Setup](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres)

[Connect to Database](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-postgres)

[Make first tables and migrate](
https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgres)

[Install prisma client so you can SQL Database via Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/install-prisma-client-typescript-postgres)

[CRUD SQL statement to Database](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/querying-the-database-typescript-postgres)
