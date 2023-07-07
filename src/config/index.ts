import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  db_connect: process.env.DATABASE_STRING,
  port: process.env.PORT,
  default_pass: process.env.ADMIN_PASS,
  env: process.env.NODE_ENV,
  bcrypt_hash_sold: process.env.BCRYPT_HASH_SOLD,
};
