'use client';
import '@/app/globals.css';

import { AppFront } from '@/components/template/appFront';
import { redirectIfNotHaveAccount } from '@/lib/account/rooting';
import React, { useEffect } from 'react';

/**
 * appページ用のエンドポイント
 * @returns 
 */
const DefaultLayout: React.FC = () => {
  useEffect(() => {
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