export function Toolbar(probs) {
  const title = probs.title || "Toolbar";
  return (
    <div className="toolbar container">
      <h6>{title}</h6>
    </div>
  );
}