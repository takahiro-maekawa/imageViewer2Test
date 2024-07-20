'use client'
import React, { useEffect, useRef } from 'react';
import { fileInfoType } from "@/types/fileInfoType"

import ImgViewerTestComp from "@/components/organism/imgViewerTestComp"
import ImgViewerTestCompOverRay from '@/components/organism/imgViewerTestCompOverRay';
import ImageWithFallback from '@/components/atom/imageWithFallBack';

interface Props {
  data: fileInfoType[]
}

export default function ImageView({ data }: Props) {
  /** 
  
  var $ = require('jQuery');

  useEffect(() => {
    if (holderRef.current) {
      $(".sample").text("Hello World!");
    }
  }, []);
  */

  return (
    <div className="p-2">
      <ImgViewerTestCompOverRay>
        <img
          src={"https://images.ygoprodeck.com/images/cards/64202399.jpg"}
          alt="Vercel Logo"

        />
      </ImgViewerTestCompOverRay>
    </div>
  )
}