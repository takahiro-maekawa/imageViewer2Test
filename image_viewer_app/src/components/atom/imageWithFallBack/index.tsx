'use client';
// https://solutions-image-fallback.vercel.app/を参考にしました。

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

// 元々のPropsで必須となっているものは、継承によってそのまま使える
interface Props extends ImageProps {
  src: string,
  fallback: string,
}

const ImageWithFallback = ({
  fallback,
  src,
  ...props
}: Props) => {
  const [error, setError] = useState<boolean>(false);

  // srcが変わったら一度errorをfalseにして様子を見る
  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <Image
      onError={() => setError(true)} // Errorが検知されたら即、errorをtrueに
      src={error ? fallback : src} // ここはまあわかる
      {...props}
    />
  );
}

export default ImageWithFallback;