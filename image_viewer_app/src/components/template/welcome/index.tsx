import { Session } from "next-auth";

import { auth } from "@/lib/auth/auth";
export default async function Welcome() {
  const session: Session | null = await auth();
  return (<>
    <div>Welcome to the Image Viewer Sample</div>
    <div>{session.user.name}</div>
  </>);
}