import React from "react";
import { SessionProvider } from "next-auth/react";

const authProvider = ({ children }: any) => {
	return <SessionProvider>{children}</SessionProvider>;
};

export default authProvider;
