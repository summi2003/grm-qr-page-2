/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// @ts-expect-error - Vite handles image imports directly
import gpzLogo from "./gpz_logo.png";

export default function App() {
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
            src={gpzLogo}
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
