import React from 'react';
import { Day } from '../../../../utils';
import CalendarWeek from '../CalendarWeek/CalendarWeek';

const CalendarBody = ({ days }: CalendarBodyProps) => {
  return (
    <>
      {days.map((week, idx) => (
        <CalendarWeek key={idx} week={week} />
      ))}
    </>
  );
};

export default React.memo(CalendarBody);

type CalendarBodyProps = { days: Day[][] };
