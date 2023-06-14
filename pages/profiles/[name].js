import Base from "../../components/base";
import { nameList } from "../../pages/index";
import path from "path";
import fs from "fs";
import Image from "next/image";
import styles from "../../styles/Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { dayToday } from "../../components/card";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function Profile({ timetableData, name, today }) {
  return (
    <Base offset={44}>
      <div className={styles.pCard}>
        <div className={styles.personBox}>
          <div className={styles.left}>
            <Image
              className={styles.pAvatar}
              src={`/avatars/${name}.jpg`}
              priority
              width={144}
              height={144}
              alt={name}
            />
          </div>
          <div className={styles.pInf}>
            <div className={styles.subject}>
              <div className={styles.pName}>{name}</div>
            </div>
            <div className={styles.quote}>"kettu praayam aayi gooyz..."</div>
            <div className={styles.course}>
              <div className={styles.edu}>
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  style={{
                    color: "var(--accent)",
                    padding: "5px 2px",
                    fontSize: "0.8rem",
                  }}
                />
                BTech CSE with IoT
              </div>
            </div>
          </div>
        </div>
      </div>
      {days.map((day, i) => {
        return (
          <div key={uuidv4()}>
            <div className={styles.dayTable}>
              <table
                style={i == dayToday ? { border: "2px solid var(--busy)" } : {}}
              >
                <tbody>
                  <tr
                    key={uuidv4()}
                    style={
                      i == dayToday
                        ? { borderBottom: "1.8px solid var(--busy)" }
                        : {}
                    }
                  >
                    <td
                      className={styles.dayName}
                      style={i == dayToday ? { background: "var(--busy)" } : {}}
                    >
                      {day}
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  {timetableData[i].map((period) => {
                    return (
                      <tr
                        key={uuidv4()}
                        style={
                          i == dayToday
                            ? { borderBottom: "1.8px solid var(--busy)" }
                            : {}
                        }
                      >
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
          </div>
        );
      })}
    </Base>
  );
}

export async function getStaticPaths() {
  const names = nameList.map((name) => {
    return {
      params: {
        name: name,
      },
    };
  });

  return { paths: names, fallback: false };
}

export async function getStaticProps({ params }) {
  const name = params.name;
  const timetablesDir = path.join(process.cwd(), "timetables");
  const fullPath = path.join(timetablesDir, `${params.name}.json`);
  const timetable = fs.readFileSync(fullPath, "utf8");
  const timetableData = JSON.parse(timetable);
  return {
    props: {
      timetableData,
      name,
    },
  };
}
