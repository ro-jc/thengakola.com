import Image from "next/image";
import bg from "../public/appBg.jpg";
import titleBg from "../public/titleBg.jpg";
import style from "../styles/Base.module.css";

export default function Base({ children }) {
  return (
    <div>
      {/* <div>
        <Image
          src={bg}
          quality={100}
          fill
          style={{ objectFit: "fill", zIndex: -2 }}
        />
      </div> */}
      <div className={style.appBar}>
        {/* <Image
          src={titleBg}
          priority
          alt="title background"
          className={style.titleBg}
        /> */}
        <h1 className={style.title}>thengakola</h1>
      </div>
      <div className={style.cardContainer}>{children}</div>
    </div>
  );
}
