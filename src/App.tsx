import gpzLogo from "./gpz_logo.png";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#313593] px-6 py-12 select-none">
      <div className="flex flex-col items-center justify-center max-w-full text-center">

        {/* Logo */}
        <div className="mb-20">
          <img
            src={gpzLogo}
            alt="GPZ Logo"
            className="w-56 h-56 md:w-64 md:h-64 object-contain pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-6 font-sans font-black tracking-wide text-[#FFD100] uppercase">
          <p
            className="leading-tight"
            style={{ fontSize: "clamp(26px, 9.5mm, 38px)" }}
          >
            Bearings Seals.
          </p>

          <p
            className="leading-tight"
            style={{ fontSize: "clamp(26px, 9.5mm, 38px)" }}
          >
            PA452142
          </p>
        </div>

      </div>
    </div>
  );
}