## TSC Command

`tsc <tsfilename>` to compile ts files to js so they can be imported and used by other js files

## Prisma Commands

`npx prisma db pull` to pull database tables into your schema file.

`npx prisma generate` to sync client to current schema in the local schema file; do this before you do CRUD SQL operation via prisma.

`npx ts-node <file location>` to execute CRUD operation code in the file.

`npx prisma migrate dev --name <any migration name>` to migrate your schema.prisma file to target database.
Because prisma make a shadow database (temporary) every time to make sure database is sync, use `npx prisma db push` if you don’t have right to make another database (no benefit from shadow database)

`npx prisma studio` to start prisma studio, the visual editor UI for database.

## Docker Container Setup For Prisma

1. `docker run -p 3306:3306 --name RSGCDB -e MYSQL_ROOT_PASSWORD=RSGC!234 -d mysql:latest` to start a docker container.

- `-p` specifies the port
- `--name` names the database
- `-MYSQL_ROOT_PASSWORD` specifies password for root superuser
- `mysql:latest` specifies mysql database at lastest version

2. For MySQL connection string, you would want something like: `DATABASE_URL="mysql://root:RSGC!234@localhost:3306/RSGCDB"` in the `.env` file at the directory

- `root:RSGC!234` specifies password `RSGC!234` for `root` superuser
- `localhost:3306/RSGCDB` specifies a database called `RSGCDB` running at `localhost` port `3306`

3. run `npx prisma db push` to push crate tables in the database.
4. run `npx ts-node prisma/seed.ts` to seed the databse.

## Resoruces

[Setup](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres)

[Connect to database](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-postgres)

[Make first tables and migrate](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgres)

[Install Prisma client so you can SQL database via Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/install-prisma-client-typescript-postgres)

[CRUD SQL statement to database](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/querying-the-database-typescript-postgres)
