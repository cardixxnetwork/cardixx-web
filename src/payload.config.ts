import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { Pages } from "./collections/Pages";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Pages],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "CHANGE-ME-IN-PRODUCTION",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.PAYLOAD_DATABASE_URI || "",
    },
  }),
  localization: {
    locales: [
      { label: "English", code: "en" },
      { label: "Turkish", code: "tr" },
      { label: "German", code: "de" },
      { label: "French", code: "fr" },
      { label: "Spanish", code: "es" },
      { label: "Portuguese", code: "pt" },
      { label: "Italian", code: "it" },
      { label: "Dutch", code: "nl" },
      { label: "Polish", code: "pl" },
      { label: "Czech", code: "cs" },
      { label: "Slovak", code: "sk" },
      { label: "Hungarian", code: "hu" },
      { label: "Romanian", code: "ro" },
      { label: "Bulgarian", code: "bg" },
      { label: "Croatian", code: "hr" },
      { label: "Slovenian", code: "sl" },
      { label: "Serbian", code: "sr" },
      { label: "Ukrainian", code: "uk" },
      { label: "Russian", code: "ru" },
      { label: "Japanese", code: "ja" },
      { label: "Korean", code: "ko" },
      { label: "Chinese", code: "zh" },
      { label: "Arabic", code: "ar" },
      { label: "Hindi", code: "hi" },
      { label: "Thai", code: "th" },
      { label: "Vietnamese", code: "vi" },
      { label: "Indonesian", code: "id" },
      { label: "Malay", code: "ms" },
      { label: "Swedish", code: "sv" },
      { label: "Danish", code: "da" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  sharp,
});
