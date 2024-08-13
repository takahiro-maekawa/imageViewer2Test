'use client';

import { getData } from '@/actions/fileActions';
import '@/app/globals.css';
import Footer from '@/components/template/footer';
import Header from '@/components/template/header';
import ImageView from '@/components/template/imageView';
import SelectArea from '@/components/template/selectArea';
import { fileInfoType, NONE } from '@/types/fileInfoType';
import React, { useEffect, useState } from 'react';

export default function RootLayout() {

  const [data, setData] = useState<fileInfoType[]>([]);
  const [targetData, setTargetData] = useState<fileInfoType>(NONE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-1"></div>
        <div className="col-span-5">
          <SelectArea data={data} setTargetData={setTargetData} />
        </div>
        <div className="col-span-5">
          <ImageView data={targetData} />
        </div>
        <div className="col-span-1"></div>
      </div>
      <Footer />
    </>
  );
}