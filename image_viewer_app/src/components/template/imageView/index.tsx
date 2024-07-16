'use client'
import React, { useEffect, useRef } from 'react';
import { fileInfoType } from "@/types/fileInfoType"

interface Props {
  data: fileInfoType[]
}

export default function ImageView({ data }: Props) {
  const holderRef = useRef(null);
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
      <div ref={holderRef} id="myholder">
        <img id="zoomImg" src="img/sample.jpg" alt="富士山" />
        <div className="sample"></div>
      </div>
    </div>
  )
}