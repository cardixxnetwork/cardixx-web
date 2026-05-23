/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "fragment CardCore on Card {\n  id\n  userId\n  firstName\n  lastName\n  jobTitle\n  profilePhoto\n}\n\nfragment CardCompanyDetails on Card {\n  companyName\n  companyEmail\n  companyPhone\n  companyWebsite\n  companyAddress\n  companyLogo\n  about\n  industry\n  specialties\n  location\n  companySize\n}\n\nfragment CardFull on Card {\n  ...CardCore\n  ...CardCompanyDetails\n  templateId\n  themeId\n  name\n  isPrivate\n  middleName\n  prefix\n  suffix\n  preferredName\n  pronouns\n  maidenName\n  bio\n  department\n  headline\n  skills\n  personalWebsite\n  discord\n  wechat\n  line\n  signal\n  linkedin\n  instagram\n  x\n  facebook\n  tiktok\n  youtube\n  github\n  dribbble\n  behance\n  snapchat\n  pinterest\n  whatsapp\n  telegram\n  threads\n  patreon\n  spotify\n  soundcloud\n  appleMusic\n  teams\n  meet\n  zoom\n  webex\n  calendly\n  bookings\n  videoLink\n  fileUpload\n  displaySettings\n  customStyles\n  frontImageUrl\n  backImageUrl\n  createdAt\n  updatedAt\n  theme {\n    ...CardThemeFull\n  }\n}": typeof types.CardCoreFragmentDoc,
    "fragment CardThemeCore on CardTheme {\n  id\n  name\n  displayName\n  description\n  isDefault\n  isPremium\n  frontPreviewUrl\n}\n\nfragment CardThemeFull on CardTheme {\n  ...CardThemeCore\n  author\n  frontHtml\n  backHtml\n  styleSchema\n  defaultDisplaySettings\n  isActive\n  frontPreviewUrl\n  backPreviewUrl\n  createdAt\n  updatedAt\n}": typeof types.CardThemeCoreFragmentDoc,
    "query PublicCard($id: String!, $source: String) {\n  publicCard(id: $id, source: $source) {\n    ...CardFull\n  }\n}": typeof types.PublicCardDocument,
};
const documents: Documents = {
    "fragment CardCore on Card {\n  id\n  userId\n  firstName\n  lastName\n  jobTitle\n  profilePhoto\n}\n\nfragment CardCompanyDetails on Card {\n  companyName\n  companyEmail\n  companyPhone\n  companyWebsite\n  companyAddress\n  companyLogo\n  about\n  industry\n  specialties\n  location\n  companySize\n}\n\nfragment CardFull on Card {\n  ...CardCore\n  ...CardCompanyDetails\n  templateId\n  themeId\n  name\n  isPrivate\n  middleName\n  prefix\n  suffix\n  preferredName\n  pronouns\n  maidenName\n  bio\n  department\n  headline\n  skills\n  personalWebsite\n  discord\n  wechat\n  line\n  signal\n  linkedin\n  instagram\n  x\n  facebook\n  tiktok\n  youtube\n  github\n  dribbble\n  behance\n  snapchat\n  pinterest\n  whatsapp\n  telegram\n  threads\n  patreon\n  spotify\n  soundcloud\n  appleMusic\n  teams\n  meet\n  zoom\n  webex\n  calendly\n  bookings\n  videoLink\n  fileUpload\n  displaySettings\n  customStyles\n  frontImageUrl\n  backImageUrl\n  createdAt\n  updatedAt\n  theme {\n    ...CardThemeFull\n  }\n}": types.CardCoreFragmentDoc,
    "fragment CardThemeCore on CardTheme {\n  id\n  name\n  displayName\n  description\n  isDefault\n  isPremium\n  frontPreviewUrl\n}\n\nfragment CardThemeFull on CardTheme {\n  ...CardThemeCore\n  author\n  frontHtml\n  backHtml\n  styleSchema\n  defaultDisplaySettings\n  isActive\n  frontPreviewUrl\n  backPreviewUrl\n  createdAt\n  updatedAt\n}": types.CardThemeCoreFragmentDoc,
    "query PublicCard($id: String!, $source: String) {\n  publicCard(id: $id, source: $source) {\n    ...CardFull\n  }\n}": types.PublicCardDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment CardCore on Card {\n  id\n  userId\n  firstName\n  lastName\n  jobTitle\n  profilePhoto\n}\n\nfragment CardCompanyDetails on Card {\n  companyName\n  companyEmail\n  companyPhone\n  companyWebsite\n  companyAddress\n  companyLogo\n  about\n  industry\n  specialties\n  location\n  companySize\n}\n\nfragment CardFull on Card {\n  ...CardCore\n  ...CardCompanyDetails\n  templateId\n  themeId\n  name\n  isPrivate\n  middleName\n  prefix\n  suffix\n  preferredName\n  pronouns\n  maidenName\n  bio\n  department\n  headline\n  skills\n  personalWebsite\n  discord\n  wechat\n  line\n  signal\n  linkedin\n  instagram\n  x\n  facebook\n  tiktok\n  youtube\n  github\n  dribbble\n  behance\n  snapchat\n  pinterest\n  whatsapp\n  telegram\n  threads\n  patreon\n  spotify\n  soundcloud\n  appleMusic\n  teams\n  meet\n  zoom\n  webex\n  calendly\n  bookings\n  videoLink\n  fileUpload\n  displaySettings\n  customStyles\n  frontImageUrl\n  backImageUrl\n  createdAt\n  updatedAt\n  theme {\n    ...CardThemeFull\n  }\n}"): (typeof documents)["fragment CardCore on Card {\n  id\n  userId\n  firstName\n  lastName\n  jobTitle\n  profilePhoto\n}\n\nfragment CardCompanyDetails on Card {\n  companyName\n  companyEmail\n  companyPhone\n  companyWebsite\n  companyAddress\n  companyLogo\n  about\n  industry\n  specialties\n  location\n  companySize\n}\n\nfragment CardFull on Card {\n  ...CardCore\n  ...CardCompanyDetails\n  templateId\n  themeId\n  name\n  isPrivate\n  middleName\n  prefix\n  suffix\n  preferredName\n  pronouns\n  maidenName\n  bio\n  department\n  headline\n  skills\n  personalWebsite\n  discord\n  wechat\n  line\n  signal\n  linkedin\n  instagram\n  x\n  facebook\n  tiktok\n  youtube\n  github\n  dribbble\n  behance\n  snapchat\n  pinterest\n  whatsapp\n  telegram\n  threads\n  patreon\n  spotify\n  soundcloud\n  appleMusic\n  teams\n  meet\n  zoom\n  webex\n  calendly\n  bookings\n  videoLink\n  fileUpload\n  displaySettings\n  customStyles\n  frontImageUrl\n  backImageUrl\n  createdAt\n  updatedAt\n  theme {\n    ...CardThemeFull\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment CardThemeCore on CardTheme {\n  id\n  name\n  displayName\n  description\n  isDefault\n  isPremium\n  frontPreviewUrl\n}\n\nfragment CardThemeFull on CardTheme {\n  ...CardThemeCore\n  author\n  frontHtml\n  backHtml\n  styleSchema\n  defaultDisplaySettings\n  isActive\n  frontPreviewUrl\n  backPreviewUrl\n  createdAt\n  updatedAt\n}"): (typeof documents)["fragment CardThemeCore on CardTheme {\n  id\n  name\n  displayName\n  description\n  isDefault\n  isPremium\n  frontPreviewUrl\n}\n\nfragment CardThemeFull on CardTheme {\n  ...CardThemeCore\n  author\n  frontHtml\n  backHtml\n  styleSchema\n  defaultDisplaySettings\n  isActive\n  frontPreviewUrl\n  backPreviewUrl\n  createdAt\n  updatedAt\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query PublicCard($id: String!, $source: String) {\n  publicCard(id: $id, source: $source) {\n    ...CardFull\n  }\n}"): (typeof documents)["query PublicCard($id: String!, $source: String) {\n  publicCard(id: $id, source: $source) {\n    ...CardFull\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;