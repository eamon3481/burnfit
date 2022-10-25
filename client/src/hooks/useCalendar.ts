import { useCallback, useState } from 'react';
import { getBeforeMonthDaysLength, getMonthDays } from '../utils';

const useCalendar = (initialDay: Date) => {
  const [date, setDate] = useState<Date>(initialDay);
  const [week, setWeek] = useState(0);

  const year = date.getFullYear();
  const month = date.getMonth();
  const days = getMonthDays(date.getMonth(), date.getMonth());
  const prevItemsCnt = getBeforeMonthDaysLength(year, month);

  const onNextWeek = useCallback(() => {
    if (week === days.length - 1) {
      setWeek(0);
      onNextMonth();
      return;
    }
    setWeek(prev => ++prev);
  }, [week]);

  const onPrevWeek = useCallback(() => {
    if (week === 0) {
      onPrevMonth();
      setWeek(prevItemsCnt - 1);
      return;
    }
    setWeek(prev => --prev);
  }, [week]);

  const onNextMonth = useCallback(() => {
    setDate(prev => {
      prev.setMonth(prev.getMonth() + 1);
      return new Date(prev);
    });
  }, []);

  const onPrevMonth = useCallback(() => {
    setDate(prev => {
      prev.setMonth(prev.getMonth() - 1);
      return new Date(prev);
    });
  }, []);

  const handleNextBtn = (isWeekCalendar: boolean) => () => {
    if (isWeekCalendar) {
      onNextWeek();
      return;
    }
    onNextMonth();
  };

  const handlePrevBtn = (isWeekCalendar: boolean) => () => {
    if (isWeekCalendar) {
      onPrevWeek();
      return;
    }
    onPrevMonth();
  };

  return {
    days,
    year,
    month,
    week,
    setWeek,
    handleNextBtn,
    handlePrevBtn,
  };
};

export default useCalendar;
