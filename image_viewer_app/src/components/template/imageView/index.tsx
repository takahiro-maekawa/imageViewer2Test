'use client'
import React, { useEffect, useRef } from 'react';
import { fileInfoType } from "@/types/fileInfoType"
import Image from "next/image";

import ImgViewerTestComp from "@/components/organism/imgViewerTestComp"
import ImgViewerTestCompOverRay from '@/components/organism/imgViewerTestCompOverRay';
import ImageWithFallback from '@/components/atom/imageWithFallBack';

interface Props {
  data: fileInfoType[]
}

export default function ImageView({ data }: Props) {
  let src = "https://images.ygoprodeck.com/images/cards/62089826.jpg";
  src = "https://images.ygoprodeck.com/images/cards/61901281.jpg";
  src = "https://images.ygoprodeck.com/images/cards/51858306.jpg";

  return (
    <div className="p-2">
      <ImgViewerTestCompOverRay>
        <img
          src={src}
          alt="猫は最高に可愛い"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="flex-1 w-full h-auto object-cover"
        />
      </ImgViewerTestCompOverRay>
    </div>
  )
}