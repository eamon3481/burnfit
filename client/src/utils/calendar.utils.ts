export const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export type Day = { id: string; day: number; isCurrentMonth: boolean };

export const getWeekNo = (date: Date) => {
  const firstDay = getFirstMonthDay(date);
  return Math.ceil((date.getDate() + firstDay.getDay()) / 7);
};

export const getFirstMonthDay = (date: Date) => {
  date.setDate(1);
  return new Date(date);
};
export const getMonthDays = (year: number, month: number): Day[][] => {
  const days = [];
  const { start, end } = getMonthEdgeDate(year, month);

  while (start.getTime() <= end.getTime()) {
    const week = DAYS.map(() => {
      const day = start.getDate();
      const id = formatDate(start);
      const isCurrentMonth = start.getMonth() === month;
      start.setDate(day + 1);
      return { id, day, isCurrentMonth };
    });

    days.push(week);
  }

  return days;
};

export const getBeforeMonthDaysLength = (year: number, month: number) => {
  const before = getYearMonth(year, month - 1);

  return getMonthDays(before.year, before.month).length;
};
export const getYearMonth = (year: number, month: number) => {
  const day = new Date();
  day.setFullYear(year);
  day.setMonth(month);
  return { year: day.getFullYear(), month: day.getMonth() };
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

export const getMonthEdgeDate = (year: number, month: number) => {
  const date = new Date(year, month);
  date.setDate(1);

  const dayOfWeek = date.getDay();

  const firstDateOfWeek = new Date(year, month, -dayOfWeek + 1);
  const lastDateOfWeek = new Date(year, month + 1, 0);

  return {
    start: firstDateOfWeek,
    end: lastDateOfWeek,
  };
};
