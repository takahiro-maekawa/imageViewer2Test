import '@/app/globals.css';

import { AppFront } from '@/components/template/appFront';
import { redirectIfNotHaveAccount } from '@/lib/account/rooting';

/**
 * appページ用のエンドポイント
 * @returns 
 */
export default async function DefaultLayout({ children }: { children: React.ReactNode }) {
  await redirectIfNotHaveAccount();

  return (
    <AppFront />
  );
}