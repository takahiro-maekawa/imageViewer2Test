import { Session } from "next-auth";

import { auth } from "@/lib/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session: Session | null = await auth();

  return (
    <>{children}</>
  );
}