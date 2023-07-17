"use client";

import { SessionProvider } from "next-auth/react";

//sessionProvider uses React Context so we need to use "use client"

const Provider = ({ children }: { children: React.ReactNode }) => {
  //our entire app has access to the children and next auth
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
