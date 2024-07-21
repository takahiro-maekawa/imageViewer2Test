'use client'
import React, { useEffect, useRef } from 'react';
import { fileInfoType } from "@/types/fileInfoType"
import Image from "next/image";
import ImgViewerTestCompOverRay from '@/components/organism/imgViewerTestCompOverRay';

interface Props {
  data: fileInfoType[]
}

export default function ImageView({ data }: Props) {
  let src = "https://images.ygoprodeck.com/images/cards/62089826.jpg";
  src = "https://images.ygoprodeck.com/images/cards/61901281.jpg";
  src = "https://images.ygoprodeck.com/images/cards/51858306.jpg";
  src = "http://dies-p.net/img/main_image00.jpg";
  src = "https://images.ygoprodeck.com/images/cards/78872731.jpg";

  return (
    <div className="p-2">
      <ImgViewerTestCompOverRay>
        <img
          src={src}
          alt="sampleImage"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="flex-1 w-full h-auto object-cover border-4 border-blue-500 my-3"
          style={{ borderRadius: '70px' }}
        />
      </ImgViewerTestCompOverRay>
    </div>
  )
}