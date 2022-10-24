import React, { useRef, useState, createContext } from 'react';
import { formatDate } from '../../../../utils';

const CalendarContext = createContext<string | null>(null);
const UpdateCalendarContext = createContext<((prev: string) => void) | null>(
  null,
);

const useCalendarContext = (): string => {
  const context = React.useContext(CalendarContext);

  if (!context) {
    throw new Error('tab context should be used with CalendarContext');
  }

  return context;
};

const useUpdateCalendarContext = () => {
  const context = React.useContext(UpdateCalendarContext);

  if (!context) {
    throw new Error('tab context should be used with UpdateCalendarContext');
  }

  return context;
};

const CalendarContextProvider: React.FC<{
  children: React.ReactNode;
  initialDate: Date;
}> = props => {
  const [selectedDay, setSelectedDay] = useState<string>(
    formatDate(props.initialDate),
  );
  //   const [] = useState<number>(getWeek(props.initialDate));
  const setSelectedDayRef = useRef(setSelectedDay).current;

  return (
    <CalendarContext.Provider value={selectedDay}>
      <UpdateCalendarContext.Provider value={setSelectedDayRef}>
        {props.children}
      </UpdateCalendarContext.Provider>
    </CalendarContext.Provider>
  );
};

export {
  CalendarContextProvider,
  useCalendarContext,
  useUpdateCalendarContext,
};
