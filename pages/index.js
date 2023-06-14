import fs from "fs";
import path from "path";

import Base from "../components/base";
import Card from "../components/card";

export const nameList = [
  "yami",
  "teena",
  "neha",
  "emily",
  "annie",
  "merlin",
  "niranjana",
  "arsha",
  "rohan",
  "georgy",
  "justus",
  "naveen",
];

export default function App({ timetables }) {
  return (
    <Base offset={55}>
      {nameList.map((name) => {
        return <Card name={name} timetable={timetables[name]} key={name} />;
      })}
    </Base>
  );
}

export async function getStaticProps() {
  var timetables = new Map();

  nameList.map((name) => {
    const timetablePath = path.join(process.cwd(), `timetables/${name}.json`);
    const timetable = fs.readFileSync(timetablePath, "utf8");
    timetables.set(name, JSON.parse(timetable));
  });

  timetables = Object.fromEntries(timetables);

  return {
    props: { timetables },
  };
}
