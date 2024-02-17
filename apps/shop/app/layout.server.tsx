"use server";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FC, ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface Props {
  children: ReactNode;
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
