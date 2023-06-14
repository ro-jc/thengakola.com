import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import style from "../styles/Card.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Card({ name, timetable }) {
  const now = new Date(Date.now());
  const dayToday = (now.getDay() - 1 + 7) % 7;

  const timetableToday = timetable[dayToday];

  var color = "to-be-busy";
  var period = {
    title: "",
    venue: "",
    start: "",
    end: "",
  };

  for (
    var currentClass = 0;
    currentClass < timetableToday.length;
    currentClass++
  ) {
    period = timetableToday[currentClass];
    let start = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      period.start.substring(11, 13),
      period.start.substring(14, 16),
      0
    );
    let end = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      period.end.substring(11, 13),
      period.end.substring(14, 16),
      0
    );
    if (end >= now) {
      if (start <= now) {
        color = "busy";
      }
      break;
    }
  }

  if (currentClass == timetableToday.length) {
    color = "free";
  }

  const [expanded, setExpanded] = useState(false);
  var middle;
  if (expanded) {
    middle = (
      <div className={style.middle}>
        <table>
          <tbody>
            {timetableToday.map((period, i) => {
              let style = {};
              if (i < currentClass) {
                style = { textDecoration: "line-through", color: "gray" };
              } else if (i == currentClass) {
                style = { background: `var(--${color})`, color: "#000000c8" };
              }
              return (
                <tr key={uuidv4()} style={style}>
                  <td>
                    {period.start.substring(11, 16)}-
                    {period.end.substring(11, 16)}
                  </td>
                  <td>{period.venue}</td>
                  <td>{period.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    middle = <></>;
  }

  function handleClick() {
    setExpanded(!expanded);
    // middle.slideToggle();
  }

  let border = `3px solid var(--${color})`;

  return (
    <div className={name}>
      <div className={style.card}>
        <div
          className={style.currentBox}
          style={
            color == "free"
              ? {
                  height: "107px",
                  borderBottomRightRadius: "20px",
                  borderBottom: "3px solid var(--accent)",
                }
              : {}
          }
        >
          <Link href={`/profiles/${name}`}>
            <div className={style.left}>
              <Image
                className={style.avatar}
                src={`/avatars/${name}.jpg`}
                alt={name}
                width={86.4}
                height={86.4}
                priority
                style={{
                  borderBottom: `5px dashed var(--${color})`,
                  borderRight: `5px dashed var(--${color})`,
                }}
              />
            </div>
          </Link>
          <div
            className={style.right}
            style={
              color == "free"
                ? { display: "none" }
                : { border: border, color: `var(--${color})` }
            }
          >
            <div className={style.subject}>
              <div
                className={style.subName}
                style={{
                  borderLeft: border,
                  borderBottom: border,
                  borderRight: border,
                }}
              >
                {period.title}
              </div>
            </div>
            <div className={style.timeloc}>
              <FontAwesomeIcon
                icon={faClock}
                style={{ color: `var(--accent)`, padding: "5px 2px" }}
              />
              <div
                className={style.time}
                style={{
                  borderTop: border,
                  borderBottom: border,
                  borderRight: border,
                }}
              >
                {period.title
                  ? `${period.start.substring(11, 16)}-${period.end.substring(
                      11,
                      16
                    )}`
                  : ""}
              </div>
              ~
              <div
                className={style.location}
                style={{
                  borderLeft: border,
                  borderBottom: border,
                  borderTop: border,
                }}
              >
                {period.venue}
              </div>
              <FontAwesomeIcon
                icon={faLocationCrosshairs}
                style={{ color: `var(--accent)`, padding: "5px 2px" }}
              />
            </div>
          </div>
        </div>
        {middle}
        <div
          className={style.bottom}
          onClick={handleClick}
          style={color == "free" ? { display: "none" } : {}}
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{
              color: `var(--accent)`,
              padding: "4px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
