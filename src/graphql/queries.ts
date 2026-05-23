/**
 * Public GraphQL queries used by SSR card / hub pages.
 *
 * `PUBLIC_CARD_QUERY` is composed from `@cardixx/card-schema` — every registry
 * entry with `publicExposable: true` is emitted, plus the fixed infrastructure
 * columns (id, timestamps, image urls, theme block) that never belong in the
 * registry. This guarantees the public query stays in sync with the registry:
 * flagging a new field as `publicExposable` exposes it here automatically, and
 * conversely un-flagging a field removes it from the public surface without a
 * separate edit.
 */

import { FIELD_REGISTRY } from "@cardixx/card-schema";

export const PUBLIC_HUB_QUERY = `
  query PublicHub($id: String!) {
    publicHub(id: $id) {
      id
      name
      primaryType
      description
      images
      address
      country
      city
      state
      addressLine2
      zipCode
      latitude
      longitude
      website
      phone
      socialLinks
      amenities
      businessHours
      activeCheckInsCount
      checkInsLast24Hours
      createdAt
      updatedAt
    }
  }
`;

const PUBLIC_CARD_FIELDS = FIELD_REGISTRY.filter((f) => f.publicExposable)
  .map((f) => f.name)
  .join("\n      ");

export const PUBLIC_CARD_QUERY = `
  query PublicCard($id: String!, $source: String) {
    publicCard(id: $id, source: $source) {
      id
      userId
      ${PUBLIC_CARD_FIELDS}
      templateId
      themeId
      name
      isPrivate
      displaySettings
      customStyles
      frontImageUrl
      backImageUrl
      createdAt
      updatedAt
      theme {
        id
        name
        displayName
        description
        isDefault
        isPremium
        frontPreviewUrl
        author
        frontHtml
        backHtml
        styleSchema
        defaultDisplaySettings
        isActive
        backPreviewUrl
        createdAt
        updatedAt
      }
    }
  }
`;
