'use client'
import React, { useEffect, useRef } from 'react';
import { fileInfoType } from "@/types/fileInfoType"

import ImgViewerTestComp from "@/components/organism/imgViewerTestComp"

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
      <ImgViewerTestComp />
    </div>
  )
}