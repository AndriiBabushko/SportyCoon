import type { JSX } from "react";

export const metadata = {
  title: "SportyCoon Dashboard | Account",
  description:
    "You can manage your account settings here. Change your password, update your email, and more.",
};

// TODO: Implement the account page
export default function Account(): JSX.Element {
  return (
    <div className="container flex flex-col gap-5">
      <h1 className="font-montserrat text-red-700">Account</h1>
    </div>
  );
}
