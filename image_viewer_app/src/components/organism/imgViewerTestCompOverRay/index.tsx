'use client'
import { useEffect, useRef, useState } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, ImageOverlay, useMap } from "react-leaflet";
import { LatLng, LatLngBounds, CRS } from "leaflet";


export default function App({ children }: { children: React.ReactNode }) {
  let ratio = 1185 / 813;

  const pixels = [1185, 813];

  const containerRef = useRef(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 370, height: 540 }); //現状は外から与える必要がある。

  useEffect(() => {
    if (containerRef.current) {
      const observeTarget = containerRef.current;

      const resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        });
        console.log("image Changed");
      });

      resizeObserver.observe(observeTarget);

      return () => {
        resizeObserver.unobserve(observeTarget);
      };
    }
  }, []); // 依存配列を空にすることで、useEffect はコンポーネントがマウントされた後に一度だけ実行されます。

  const latlng1 = new LatLng(0, 0);
  const latlng2 = new LatLng(dimensions.height / 2, dimensions.width / 2);
  //const latlng2 = new LatLng(pixels[0] / 2, pixels[1] / 2);

  const bounds = new LatLngBounds(latlng1, latlng2) // 1185 x 813 となっているので比率をうまく合わせれば問題ないはず
  return (
    <div ref={containerRef} className="parent" style={{ position: "relative" }}>
      {children}
      <MapContainer
        center={[0, 0]}
        zoom={1}
        crs={CRS.Simple}
        scrollWheelZoom={true}
        maxBounds={bounds} // マップの移動範囲を制限
        maxBoundsViscosity={1.0} // マップの移動範囲を制限
        minZoom={1}
        maxZoom={10}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 10 }}
        attributionControl={false} // デフォルトの著作権表示を非表示
        className='overlay'
      >
        <ImageOverlay
          url="https://images.ygoprodeck.com/images/cards/64202399.jpg" bounds={bounds} />
      </MapContainer>
    </div >
  );
}