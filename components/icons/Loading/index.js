import style from "./style.module.scss";

export default function Loading({ color = "#3498db", size = "30px" }) {
  return (
    <div className={style.container}>
      <div className={style.loader} style={{ borderTop: `3px solid ${color}`, width: size, height: size }}></div>
    </div>
  )
}
