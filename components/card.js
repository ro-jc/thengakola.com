import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import style from "../styles/Card.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Card({ name, timetable }) {
  let image = `/../public/avatars/${name}.jpg`;

  const now = new Date(Date.now());
  const timetableToday = timetable[(now.getDay() - 1 + 7) % 7];

  const [expanded, setExpanded] = useState(true);
  var middle;
  if (expanded) {
    middle = (
      <div className={style.middle}>
        <table>
          <tbody>
            {timetableToday.map((period) => (
              <tr key={uuidv4()}>
                <td>
                  {period.start.substring(11, 16)}-
                  {period.end.substring(11, 16)}
                </td>
                <td>{period.venue}</td>
                <td>{period.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    middle = <div className={style.middle}></div>;
  }

  function handleClick() {
    setExpanded(!expanded);
    // middle.slideToggle();
  }

  return (
    <div className={name}>
      <div className={style.card}>
        <div className={style.currentBox}>
          <a href={`./${name}.html`}>
            <div className={style.left}>
              <Image
                className={style.avatar}
                src={image}
                alt={name}
                width={86.4}
                height={86.4}
              />
            </div>
          </a>
          <div className={style.right}>
            <div className={style.subject}>
              <div className={style.subName}></div>
            </div>
            <div className={style.timeloc}>
              <FontAwesomeIcon icon={faClock} />
              <div className={style.time}></div>~
              <div className={style.location}></div>
              <FontAwesomeIcon icon={faLocationCrosshairs} />
            </div>
          </div>
        </div>
        {middle}
        <div className={style.bottom} onClick={handleClick}>
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{ color: "white", padding: "4px 48%" }}
          />
        </div>
      </div>
    </div>
  );
}
