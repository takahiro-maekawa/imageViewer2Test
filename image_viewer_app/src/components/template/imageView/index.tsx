'use client'
import React, { useEffect, useRef } from 'react';
import { fileInfoType } from "@/types/fileInfoType"
import ImgViewerTestCompOverRay from '@/components/molecule/imgViewerTestCompOverRay';
import dynamic from 'next/dynamic';

interface Props {
  data: fileInfoType
}

const ImgViewerTestCompOverRayNoSSR = dynamic(
  () => import('@/components/molecule/imgViewerTestCompOverRay'),
  { ssr: false }
);

export default function ImageView({ data }: Props) {

  let src = data.imageUrl;

  return (
    <div className="p-2">
      <ImgViewerTestCompOverRayNoSSR>
        <img
          src={src}
          alt="sampleImage"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="flex-1 w-full h-auto object-cover border-4 border-blue-500 my-3"
          style={{ borderRadius: '70px' }}
        />
      </ImgViewerTestCompOverRayNoSSR>
    </div>
  )
}