import React from "react";
import Navbar from "../navbar/page";

export default function ComposedLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main>{children}</main>
      </div>
    );
  }