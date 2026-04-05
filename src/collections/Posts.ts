import type { CollectionConfig } from "payload";
import { translatePostAfterChange } from "../hooks/translatePost";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "status", "publishedDate"],
  },
  hooks: {
    afterChange: [translatePostAfterChange],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      localized: true,
    },
    {
      name: "content",
      type: "richText",
      localized: true,
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "publishedDate",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      defaultValue: "draft",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
