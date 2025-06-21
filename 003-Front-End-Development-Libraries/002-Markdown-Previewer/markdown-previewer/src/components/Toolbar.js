export function Toolbar(probs) {
  const title = probs.title || "Toolbar";
  return (
    <div className="toolbar container bg-primary p-1">
      <h6>{title}</h6>
    </div>
  );
}