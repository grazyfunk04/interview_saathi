/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai%20interview_owner:m0b7sXidtowh@ep-sparkling-cloud-a59lzuwo.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
    }
  };
  