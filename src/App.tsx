/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
// @ts-expect-error - Vite handles image imports directly
import gpzLogo from "./gpz_logo.png";

/**
 * Custom hook to dynamically make the background color of an image transparent.
 * Reads the background color from the top-left corner (0,0) and keys it out.
 */
function useTransparentImage(src: string) {
  const [transparentSrc, setTransparentSrc] = useState<string>(src);

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Extract background color from top-left pixel (0,0)
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];

      // Threshold to catch neighboring compressed colors smoothly
      const threshold = 45;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];

        // Euclidean color distance
        const distance = Math.sqrt(
          Math.pow(r - bgR, 2) +
          Math.pow(g - bgG, 2) +
          Math.pow(b - bgB, 2)
        );

        if (distance < threshold) {
          // Set alpha (opacity) to 0
          data[i+3] = 0;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      try {
        setTransparentSrc(canvas.toDataURL("image/png"));
      } catch (e) {
        console.error("Error generating transparent image:", e);
      }
    };
  }, [src]);

  return transparentSrc;
}

export default function App() {
  const cleanLogo = useTransparentImage(gpzLogo);

  return (
    <div
      id="app-container"
      className="flex flex-col items-center justify-center min-h-screen w-full bg-[#313593] px-6 py-12 select-none"
    >
      <div
        id="content-wrapper"
        className="flex flex-col items-center justify-center max-w-full text-center"
      >
        {/* LOGO CONTAINER */}
        <div id="logo-container" className="mb-20">
          <img
            id="gpz-logo-img"
            src={cleanLogo}
            alt="GPZ Logo"
            referrerPolicy="no-referrer"
            className="w-56 h-56 md:w-64 md:h-64 select-none pointer-events-none object-contain"
          />
        </div>

        {/* IDENTIFICATION TEXT BLOCK (approx. 9-10mm on screen) */}
        <div
          id="id-text-group"
          className="flex flex-col items-center justify-center gap-6 font-sans font-black tracking-wide text-[#FFD100] uppercase"
        >
          <p
            id="text-gpz-limited"
            className="leading-tight select-text"
            style={{ fontSize: "clamp(26px, 9.5mm, 38px)" }}
          >
            Bearings Cover Ring 
          </p>
          <p
            id="text-gpz-limited"
            className="leading-tight select-text"
            style={{ fontSize: "clamp(26px, 9.5mm, 38px)" }}
          >
            AV
          </p>
          <p
            id="text-pa194026"
            className="leading-tight select-text"
            style={{ fontSize: "clamp(26px, 9.5mm, 38px)" }}
          >
            PA194026
          </p>
        </div>
      </div>
    </div>
  );
}
