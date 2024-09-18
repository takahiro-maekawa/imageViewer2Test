'use client';

import { getDataFromApiKey } from '@/actions/fileActions';
import '@/app/globals.css';
import ImageView from '@/components/template/imageView';
import SelectArea from '@/components/template/selectArea';
import ApiForm from '@/components/template/apiSubmit';
import { fileInfoType, NONE } from '@/types/fileInfoType';
import React, { useEffect, useState } from 'react';

/**
 * アプリそのもの
 * @returns
 */
export function AppFront() {
  const [data, setData] = useState<fileInfoType[]>([]);
  const [targetData, setTargetData] = useState<fileInfoType>(NONE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiKeyEncripted, setApiKeyEncripted] = useState<String>(null);

  // データ更新を任意のタイミングで可能にするために、データ更新用の関数を準備
  const fetchAndSetData = async (apiKeyEncripted?: String) => {
    if (!apiKeyEncripted) {
      return;
    }
    setIsLoading(true);
    const result = await getDataFromApiKey(apiKeyEncripted);
    setData(result);
    setIsLoading(false);
    setTargetData(NONE);
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-1"></div>
        {!apiKeyEncripted ?
          <div className="col-span-10">
            <ApiForm setApiKeyEncripted={setApiKeyEncripted} fetchAndSetData={fetchAndSetData} />
          </div> :
          <>
            <div className="col-span-5">
              {isLoading ? <><span>データ取り込み中</span></> :
                <SelectArea data={data} setTargetData={setTargetData} />}
            </div>
            <div className="col-span-5">
              <ImageView data={targetData} />
            </div>
          </>
        }
        <div className="col-span-1"></div>
      </div>
    </>
  );
}