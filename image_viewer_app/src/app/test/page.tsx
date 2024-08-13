'use client';

import { getData } from '@/actions/fileActions';
import '@/app/globals.css';
import Footer from '@/components/template/footer';
import Header from '@/components/template/header';
import ImageView from '@/components/template/imageView';
import SelectArea from '@/components/template/selectArea';
import { fileInfoType, NONE } from '@/types/fileInfoType';
import React, { useEffect, useState } from 'react';

export const NoImageComponent = () => {
  return (<>
    <span>表示する画像がありません</span>
  </>)
}

export default function RootLayout({
  children,
}: {
  children: React.ReactElement;
}) {

  const [data, setData] = useState<fileInfoType[]>([]);
  const [targetData, setTargetData] = useState<fileInfoType>(NONE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
        if (result.length > 0) {
          setTargetData(result[0]);
        }
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="grid grid-cols-12">
        <div className="col-span-1"></div>
        <div className="col-span-5">
          <SelectArea data={data} setTargetData={setTargetData} />
        </div>
        <div className="col-span-5">
          {targetData == NONE ? <NoImageComponent /> : <ImageView data={targetData} />}
        </div>
        <div className="col-span-1"></div>
      </div>
      <Footer />
    </>
  );
}