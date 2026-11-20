-- Add the standard Auth.js adapter field used by OAuth sign-ins.
ALTER TABLE "User" ADD COLUMN "emailVerified" DATETIME;
