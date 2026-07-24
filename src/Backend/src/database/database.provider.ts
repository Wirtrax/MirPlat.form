import { DataSource } from "typeorm";

export const databaseProviders = [
  {
    provide: "DATA_SOURCE",
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DBHOST,
        port: parseInt(process.env.DBPORT as string),
        username: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME,
        entities: [__dirname + '/entities/*.entity.ts'],
        synchronize: true, // TODO: Remove this before release to production
      });

      return dataSource.initialize();
    }
  }
]
