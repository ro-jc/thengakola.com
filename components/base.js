import style from "../styles/Base.module.css";

export default function Base({ children }) {
  return (
    <div>
      <div style={{ height: "55px" }}></div>
      <div className={style.appBar}>
        <h1 className={style.title}>thengakola</h1>
      </div>
      <div className={style.cardContainer}>{children}</div>
    </div>
  );
}
