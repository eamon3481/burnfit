import { useCallback, useState } from 'react';
import { formatDate } from '../utils';

const useCalendar = (initialDay: Date) => {
  const [selectedDay, setSelectedDay] = useState<string>(
    formatDate(initialDay),
  );

  const [date, setDate] = useState<Date>(initialDay);

  const onNextMonth = useCallback(() => {
    setDate(prev => {
      prev.setMonth(date.getMonth() + 1);
      return new Date(prev);
    });
  }, [date]);

  const onPrevMonth = useCallback(() => {
    setDate(prev => {
      prev.setMonth(date.getMonth() - 1);
      return new Date(prev);
    });
  }, [date]);

  const onSelectedDay = (dayId: string) => {
    setSelectedDay(dayId);
  };

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    selectedDay,
    onNextMonth,
    onPrevMonth,
    onSelectedDay,
  };
};

export default useCalendar;
