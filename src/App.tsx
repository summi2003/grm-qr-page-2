import { useState, useEffect } from "react";
import gpzLogo from "./gpz_logo.png";

function useTransparentImage(src: string) {
  const [transparentSrc, setTransparentSrc] = useState<string>(src);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];

      const threshold = 55;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const distance = Math.sqrt(
          (r - bgR) ** 2 +
          (g - bgG) ** 2 +
          (b - bgB) ** 2
        );

        if (distance < threshold) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setTransparentSrc(canvas.toDataURL("image/png"));
    };
  }, [src]);

  return transparentSrc;
}

export default function App() {
  const cleanLogo = useTransparentImage(gpzLogo);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#313593] px-6 py-12 select-none">
      <div className="flex flex-col items-center justify-center max-w-full text-center">
        <div className="mb-20">
          <img
            src={cleanLogo}
            alt="GPZ Logo"
            className="w-56 h-56 md:w-64 md:h-64 select-none pointer-events-none object-contain"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-6 font-sans font-black tracking-wide text-[#FFD100] uppercase">
          <p
            className="leading-tight select-text"
            style={{ fontSize: "clamp(26px, 9.5mm, 38px)" }}
          >
            Bearings Seals.
          </p>

          <p
            className="leading-tight select-text"
            style={{ fontSize: "clamp(26px, 9.5mm, 38px)" }}
          >
            PA452142
          </p>
        </div>
      </div>
    </div>
  );
}