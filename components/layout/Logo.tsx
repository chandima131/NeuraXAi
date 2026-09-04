export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo${light ? " logo-light" : ""}`} aria-label="NeuraX">
      <span className="logo-symbol" aria-hidden="true"><i>N</i><b>X</b></span>
      <span className="logo-word">Neura<b>X</b></span>
    </span>
  );
}
