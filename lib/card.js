import fs from "fs";

export async function getTimetable(name) {
  const timetablePath = path.join(process.cwd(), `timetables/${name}`);
  var timetable = fs.readFileSync(timetablePath, "utf8");
  timetable = JSON.parse(timetable);
  return timetable;
}
