'use client'
import { MapContainer, Marker, Popup, ImageOverlay } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from 'react';
import { LatLngBounds, LatLngBoundsLiteral } from "leaflet";
import { LatLngTuple } from "leaflet";
import Image from 'next/image'

export default function ImgViewerTestComp() {


  const latLon1: LatLngTuple = [0, 0];
  const latLon2: LatLngTuple = [900, 500];
  const bounds: LatLngBoundsLiteral = [latLon1, latLon2];

  return (
    <>
      <Image
        src="/Donald.jpg"
        width={500}
        height={500}
        alt="Picture of the author"
      />

      <MapContainer
        center={[0, 0]}
        zoom={1}
        scrollWheelZoom={true}
        style={{ height: "40vh", width: "100%" }}

      >
        <ImageOverlay
          url="/Donald.jpg" bounds={bounds} />

      </MapContainer>
    </>
  );
}