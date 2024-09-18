import '@/app/globals.css';

import { AppFront } from '@/components/template/appFront';
import { redirectIfNotHaveAccount } from '@/lib/account/rooting';
import React, { ReactNode } from 'react';

/**
 * appページ用のエンドポイント
 * @returns 
 */
const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
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