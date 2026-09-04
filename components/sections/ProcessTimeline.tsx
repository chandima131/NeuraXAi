const steps = [
  ["01", "Discover", "We learn about your business, users and goals."],
  ["02", "Plan", "We agree functionality, scope, timeline and price."],
  ["03", "Design", "We create the user experience and visual direction."],
  ["04", "Build", "We develop and test the solution."],
  ["05", "Launch", "We deploy the final product."],
  ["06", "Support", "Optional ongoing assistance is available."],
];

export function ProcessTimeline() {
  return <ol className="process-timeline">{steps.map(([number, title, copy]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>;
}
