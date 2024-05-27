
export default function Error({title, message}) {
  return (
    <div style={{textAlign: "center"}}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
