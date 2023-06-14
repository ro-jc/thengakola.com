import style from "../styles/Base.module.css";
import Head from "next/head";
import Link from "next/link";

export default function Base({ children, offset }) {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <title>thengakola</title>
      </Head>
      <div>
        <div style={{ height: `${offset}px` }}></div>
        <Link href="/">
          <div className={style.appBar}>
            <h1 className={style.title}>thengakola</h1>
          </div>
        </Link>
        <div className={style.cardContainer}>{children}</div>
      </div>
    </>
  );
}
