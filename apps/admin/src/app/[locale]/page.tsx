import type { JSX } from "react";
import type { Metadata } from "next";
import { DashboardLayout } from "@admin/components/layouts";
import { Content } from "./components";

export const metadata: Metadata = {
  title: "SportyCoon Dashboard | Home",
  description:
    "Welcome to the SportyCoon Dashboard, your hub for managing the content of the SportyCoon main site.",
};

export default function Root(): JSX.Element {
  return (
    <DashboardLayout>
      <Content />
    </DashboardLayout>
  );
}
