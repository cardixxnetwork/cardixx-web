import type React from "react";
import type { ServerFunctionClientArgs } from "payload";
import config from "@payload-config";
import { RootLayout } from "@payloadcms/next/layouts";
import { handleServerFunctions } from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap";

import "@payloadcms/next/css";

import "./custom.scss";

type Args = {
  children: React.ReactNode;
};

const serverFunction = async (args: ServerFunctionClientArgs) => {
  "use server";
  return handleServerFunctions({
    ...args,
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
