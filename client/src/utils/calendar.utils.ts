export const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export type Day = { id: string; day: number } | null;

export const getMonthDays = (year: number, month: number): Day[][] => {
  const days = [];
  const current = new Date();
  current.setFullYear(year);
  current.setMonth(month - 1);
  current.setDate(1);
  while (current.getMonth() + 1 === month) {
    const week = DAYS.map((_, dayIndex) => {
      if (current.getDay() !== dayIndex || current.getMonth() + 1 !== month) {
        return null;
      }
      const day = current.getDate();
      const id = formatDate(current);
      current.setDate(current.getDate() + 1);
      return { id, day };
    });

    days.push(week);
  }

  return days;
};

export const formatDate = (date: Date) => {
  const { year, month, day } = getDateElements(date);

  const obj: { [key: string]: string } = {
    YYYY: year.toString(),
    MM: `0${month}`.toString().slice(-2),
    DD: `0${day}`.toString().slice(-2),
  };

  let res: string = 'YYYY-MM-DD';

  Object.keys(obj).forEach(k => {
    res = res.replace(k, obj[k]);
  });

  return res;
};

export const getDateElements = (
  d: Date | string,
): Record<'year' | 'month' | 'day' | 'weekday', number> => {
  const dateValue = typeof d === 'string' ? new Date(d) : d;
  const year = dateValue.getFullYear();
  const month = dateValue.getMonth() + 1;
  const day = dateValue.getDate();
  const weekday = dateValue.getDay();
  return { year, month, day, weekday };
};
