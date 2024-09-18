import { Session } from "next-auth";

import { auth } from "@/lib/auth/auth";
import NewTeamAndUserForm from "@/components/organism/welcome/newTeamAndUserForm";
import OnlyUserForm from "@/components/organism/welcome/onlyUserFrom";
/**
 * ようこそページのテンプレート
 * @returns Welcomeページ
 */
export default async function Welcome() {
  const session: Session | null = await auth();

  return (<>
    <h1>ようこそ {session.user.name} さん</h1>
    <div className="flex-wrap justify-center grid grid-cols-1 lg:grid-cols-2">
      <div className="col-span-1"><NewTeamAndUserForm /></div>
      <div className="col-span-1"><OnlyUserForm /></div>
    </div>
    <></>
  </>);
}