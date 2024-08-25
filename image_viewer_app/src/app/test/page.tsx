'use client';

import { getData } from '@/actions/fileActions';
import '@/app/globals.css';
import Footer from '@/components/template/footer';
import Header from '@/components/template/header';
import ImageView from '@/components/template/imageView';
import SelectArea from '@/components/template/selectArea';
import ApiForm from '@/components/template/apiForm';
import { fileInfoType, NONE } from '@/types/fileInfoType';
import React, { useEffect, useState } from 'react';

export default function RootLayout() {
  const [data, setData] = useState<fileInfoType[]>([]);
  const [targetData, setTargetData] = useState<fileInfoType>(NONE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiKeyEncripted, setApiKeyEncripted] = useState<String>("");

  // データ更新を任意のタイミングで可能にするために、データ更新用の関数を準備
  const fetchAndSetData = async () => {
    setIsLoading(true);
    setTargetData(NONE);
    const result = await getData();
    setData(result);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-1"></div>
        {apiKeyEncripted == "" ?
          <div className="col-span-10">
            <ApiForm />
          </div> :
          <>
            <div className="col-span-5">
              {
                isLoading ? <><span>データ取り込み中</span></> :
                  <SelectArea data={data} setTargetData={setTargetData} />}
            </div>
            <div className="col-span-5">
              <ImageView data={targetData} />
            </div>
          </>
        }
        <div className="col-span-1"></div>
      </div>
      <Footer />
    </>
  );
}