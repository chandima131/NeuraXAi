const trustItems = ["UK-Based", "Free Initial Consultation", "Transparent Starting Prices", "Custom Solutions", "Ongoing Support"];

export function TrustBar() {
  return <section className="trust-bar" aria-label="NeuraX service commitments"><div className="container">{trustItems.map((item) => <span key={item}><b aria-hidden="true">✓</b>{item}</span>)}</div></section>;
}
