'use client'
import { isValidElement, useEffect, useRef, useState } from 'react';
import "leaflet/dist/leaflet.css"; // leafletのスタイルシートがないと、プラス-マイナスボタンが表示されない
import { MapContainer, ImageOverlay, useMap, useMapEvent } from "react-leaflet";
import { LatLng, LatLngBounds, CRS } from "leaflet";

function MapControll({ setBounds }: { setBounds: React.Dispatch<React.SetStateAction<LatLngBounds>> }) {

  // マップのサイズが変更された時にマップの移動範囲を更新するために準備
  const map = useMap();

  // ウィンドウそのもののサイズ変更を検知した場合の処理
  const handleWindowResize = () => {
    map.invalidateSize({ animate: false }); // これを外すとラグるので残します
  };

  // マウント時にイベントリスナーを追加
  useEffect(() => {
    // ウィンドウそのものにリサイズイベントを追加
    window.addEventListener('resize', handleWindowResize);

    // 描画境界を設定
    setBounds(map.getBounds());

    // マップの移動範囲を制限（これを外すと画像が描画範囲外に飛び出す）
    map.setMaxBounds(map.getBounds());

    // コンポーネントがアンマウントされたときにイベントリスナーを削除
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // マップに対するリサイズイベント
  // マップのサイズが変更された時にマップの移動範囲を更新するために準備
  const onResize = () => {
    setBounds(map.getBounds());
    map.setMaxBounds(map.getBounds());
  }
  useMapEvent('resize', onResize);

  return null;
}

export default function App({ children }: { children: React.ReactNode }) {
  if (!isValidElement(children)) {
    return null;
  }

  if (!children.props.src) {
    return null;
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
  const [bounds, setBounds] = useState<LatLngBounds>(new LatLngBounds(new LatLng(0, 0), new LatLng(dimensions?.height / 2, dimensions?.width / 2)));
  const zoom = 1;
  const [src, setSrc] = useState<string>(children.props.src);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
      const latlng1 = new LatLng(0, 0);
      const latlng2 = new LatLng(height / 2, width / 2);
      setBounds(new LatLngBounds(latlng1, latlng2));
    }
  }, []);

  // 子コンポーネントが変更されたときにsrcを更新
  // 記事を公開するタイミングでは消すかもしれない

  useEffect(() => {
    setSrc(children.props.src);
  }, [children]);
  const childStyle = children.props.style || {};
  const childClassName = children.props.className || '';

  return (
    <>
      <div ref={containerRef} className="parent" style={{ position: "relative" }}>
        {children}

        {/** リーフレットマップコンテナ */}
        <MapContainer
          center={[0, 0]}
          zoom={zoom}
          crs={CRS.Simple}
          scrollWheelZoom={true}
          maxBounds={bounds} // マップの移動範囲を制限
          maxBoundsViscosity={1.0} // マップの移動範囲を制限
          minZoom={1}
          maxZoom={10}
          style={{ ...childStyle, position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 10 }}
          attributionControl={false} // デフォルトの著作権表示を非表示
          className={childClassName}
        >
          {/** Map制御用のコンポーネント */}
          <MapControll setBounds={setBounds} />

          {/** 画像 */}
          <ImageOverlay url={src} bounds={bounds} />
        </MapContainer>
      </div >
    </>

  );
}