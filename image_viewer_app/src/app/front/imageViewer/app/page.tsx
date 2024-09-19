import '@/app/globals.css';

import { AppFront } from '@/components/template/appFront';
import { redirectIfNotHaveAccount } from '@/lib/account/rooting';
import React, { ReactNode } from 'react';

/**
 * appページ用のエンドポイント
 * @returns 
 */
const DefaultLayout: React.FC = () => {
  React.useEffect(() => {
    const checkAccount = async () => {
      await redirectIfNotHaveAccount();
    };
    checkAccount();
  }, []);

  return (
    <AppFront />
  );
};

export default DefaultLayout;