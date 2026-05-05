/**
 * Thin re-export of the canonical social-icon registry from
 * `@cardixx/card-schema`. Kept for the existing `@/utils/social-icons` import
 * path; prefer importing directly from the package in new code.
 */

export {
  SOCIAL_LINK_ORDER as SOCIAL_LINK_FIELDS,
  getSocialIconSvg,
} from "@cardixx/card-schema";
