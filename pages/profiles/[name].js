import Base from "../../components/base";
import { nameList } from "../../pages/index";
import path from "path";
import fs from "fs";
import Image from "next/image";
import styles from "../../styles/Profile.module.css";
import { v4 as uuidv4 } from "uuid";

export default function Profile({ timetableData, name }) {
  // console.log(timetableData);
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  return (
    <Base offset={44}>
      <div className={styles.pCard}>
        <div className={styles.personBox}>
          <div className={styles.left}>
            <Image
              className={styles.pAvatar}
              src={`/../public/avatars/${name}.jpg`}
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
                <i class="fa-solid fa-graduation-cap"></i> BTech CSE with IoT
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.dayTable}>
          <table>
            <tbody>
              {/* <tr> */}
              <td className={styles.dayName}>Monday</td>
              {/* </tr> */}
            </tbody>
          </table>
        </div>
      </div>
      <div class="upper">
        <div className={styles.dayTable}>
          <table>
            <td className={styles.dayName}>Tuesday</td>
          </table>
        </div>
      </div>
      <div class="upper">
        <div className={styles.dayTable}>
          <table>
            <td className={styles.dayName}>Wednesday</td>
          </table>
        </div>
      </div>
      <div class="upper">
        <div className={styles.dayTable}>
          <table>
            <td className={styles.dayName}>Thursday</td>
          </table>
        </div>
      </div>
      <div class="upper">
        <div className={styles.dayTable}>
          <table>
            <td className={styles.dayName}>Friday</td>
          </table>
        </div>
      </div>
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
