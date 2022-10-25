import { useCallback, useState } from 'react';

const useCalendar = (initialDay: Date) => {
  const [date, setDate] = useState<Date>(initialDay);

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

  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    onNextMonth,
    onPrevMonth,
  };
};

export default useCalendar;
