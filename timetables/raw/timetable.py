import json
import os
from datetime import datetime, timedelta

DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
COURSE_TITLES = {
    "BCHY101": "Chemistry",
    "BPHY101": "Physics",
    "BEEE102": "BEEE",
    "BCSE202": "DSA",
    "BCSE102": "OOPS",
    "BITE202": "DL & Microprocessors",
    "BMEE201": "Mechanics",
    "BCLE201": "Construction Materials",
    "BCSE103": "Java",
    "BMAT102": "Differential Equations",
    "BECE201": "Electronic Materials and Devices",
    "BECE203": "Circuit Theory",
    "BENG101": "English",
    "BSTS101": "QSP",
    "BHUM106": "Sociology",
}


def timings_to_datetimes(start, end):
    date = datetime(2022, 9, 19, 0, 0, 0, 0)
    start = date.replace(**dict(zip(("hour", "minute"), map(int, start.split(":")))))
    end = date.replace(**dict(zip(("hour", "minute"), map(int, end.split(":")))))
    return start, end


def create_timetable(inp):
    # Organise input into lists
    data = [line.split("\t") for line in inp.split("\n") if line]

    # Remove 'Start', 'End', 'LAB', 'THEORY' and day names
    for i, line in enumerate(data):
        if line[1].isalpha():
            data[i] = line[2:]
        else:
            data[i] = line[1:]

    # Seperate out timings for theory and lab
    theory_timings = data[:2]
    lab_timings = data[2:4]
    data = data[4:]

    # Store each day's classes in that day's list
    timetable = [[] for _ in range(7)]
    for d, line in enumerate(data):
        for i, slot in enumerate(line):
            if slot.strip() != "-" and "-" in slot:
                # Every second line is a lab entry
                if d % 2 == 1:
                    start, end = timings_to_datetimes(
                        lab_timings[0][i], lab_timings[1][i]
                    )
                    if timetable[d // 2]:
                        if abs(start - timetable[d // 2][-1]["end"]) <= timedelta(
                            minutes=2
                        ):
                            timetable[d // 2][-1]["end"] = end
                            continue
                else:
                    start, end = timings_to_datetimes(
                        theory_timings[0][i], theory_timings[1][i]
                    )

                slot = slot.split("-")
                slot[1] = slot[1][:-1]

                course_title = COURSE_TITLES.get(slot[1], slot[1])

                # Every second line is a lab entry
                course_title += " Lab" if d % 2 == 1 else ""

                period = {
                    "title": course_title,
                    "venue": slot[3],
                    "start": start,
                    "end": end,
                }
                timetable[d // 2].append(period)

    timetable = [sorted(day, key=lambda x: x["start"]) for day in timetable]

    return timetable


if __name__ == "__main__":
    print(
        "Make sure you run it in a directory with vtop timetable outputs saved in files named <name>.txt"
    )
    file_list = [file for file in os.listdir() if ".txt" in file]

    for file in file_list:
        # Directly copied input from VTOP
        name = file[:-4]
        print(f"Processing {name}")

        inp = open(f"{name}.txt").read()
        timetable = create_timetable(inp)

        json.dump(timetable, open(f"../{name}.json", "w"), indent="\t", default=str)

        print(f"{name}.json created successfully.")
