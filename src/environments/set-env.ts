const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';
  const targetPathProd = './src/environments/environment.prod.ts';
  // Load node modules
  const colors = require('colors');
  require('dotenv').config({
    path: 'src/environments/.env',
  });
  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
  apiKey: '${process.env.API_KEY}',
  endpoint: '${process.env.ENDPOINT}',
  projectId: '${process.env.PORJECT_ID}',
  weatherApi: '${process.env.WEATHER_SERCRET}',
  databaseId: '${process.env.DATABASE_ID}',
  profileCollectionId: '${process.env.PROFILE_COLLECTION}',
  flightCollectionId: '${process.env.FLIGHT_COLLECTION}',
  droneCollectionId: '${process.env.DRONE_COLLECTION}',
  production: true,
};
`;
  console.log(
    colors.magenta(
      'The file `environment.ts` will be written with the following content: \n'
    )
  );
  writeFile(targetPath, envConfigFile, (err: any) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        colors.magenta(
          `Angular environment.ts file generated correctly at ${targetPath} \n`
        )
      );
    }
  });
  writeFile(targetPathProd, envConfigFile, (err: any) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        colors.magenta(
          `Angular environment.ts file generated correctly at ${targetPath} \n`
        )
      );
    }
  });
};

setEnv();
