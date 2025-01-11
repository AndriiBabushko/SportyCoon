import type { JSX } from "react";
import type { Metadata } from "next";
import { RegisterForm } from "./components";

export const metadata: Metadata = {
  title: "SportyCoon Dashboard | Register",
  description:
    "Register for a SportyCoon Dashboard account using a step-by-step form to enter your information.",
};

export default function Register(): JSX.Element {
  return <RegisterForm />;
}
