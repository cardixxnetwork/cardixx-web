import type React from "react";
import config from "@payload-config";
import { RootLayout } from "@payloadcms/next/layouts";
import { handleServerFunctions } from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap";

import "@payloadcms/next/css";

import "./custom.scss";

type Args = {
  children: React.ReactNode;
};

const serverFunction = async (args: unknown) => {
  "use server";
  return handleServerFunctions({
    ...(args as Record<string, unknown>),
    config,
    importMap,
  });
};

const Layout = ({ children }: Args) => (
  <RootLayout
    config={config}
    importMap={importMap}
    serverFunction={serverFunction}
  >
    {children}
  </RootLayout>
);

export default Layout;
