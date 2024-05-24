export const TODAY = new Date('2024-01-28');
TODAY.setHours(0, 0, 0, 0);
export const TODAY_ISO_STRING = TODAY.toISOString();

export type DateString = string;

export type CalenderWeek = number;

export const getMondayFromWeek = (calenderWeek: CalenderWeek): Date => {
  const d = 1 + (calenderWeek - 1) * 7;
  const date = new Date(2024, 0, d);
  const dayOfWeek = date.getDay();

  const isSunday = dayOfWeek === 0;
  const difference = isSunday ? 6 : dayOfWeek - 1;

  return new Date(date.setDate(date.getDate() - difference));
};

export const createWeekDaysArray = (date: Date): DateString[] => {
  return Array(7)
    .fill(date)
    .map((d, i) => {
      const day = new Date(d.setDate(d.getDate() - d.getDay() + i));
      const isSunday = d.getDay() === 0;
      if (isSunday) day.setDate(day.getDate() + 7);

      day.setHours(0, 0, 0, 0);
      return day.toISOString();
    });
};

export const isSameDay = (a: Date, b: Date): boolean => {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
};
