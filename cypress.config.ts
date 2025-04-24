import { defineConfig } from "cypress";
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './apps/api/.env' });


export default defineConfig({
  e2e: {
    env: {
      DATABASE_URL: process.env.DATABASE_URL,
      API_KEY: process.env.API_KEY,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        async findInMongo(query) {
          const uri = config.env.DATABASE_URL
          const client = new MongoClient(uri)
          await client.connect()
          const db = client.db()
          const result = await db.collection('User').findOne(query)
          await client.close()
          return result
        },
      })
    },
  },
});
