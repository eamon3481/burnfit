import React from 'react';
import { Day } from '../../../../utils';
import CalendarDay from '../CalendarDay/CalendarDay';
import * as S from './CalendarWeek.style';

const CalendarWeek = ({ week }: CalendarWeekProps) => {
  return (
    <S.WeekList>
      {week.map((day, idx) => (
        <CalendarDay key={day ? day.id : idx} day={day} />
      ))}
    </S.WeekList>
  );
};

export default React.memo(CalendarWeek);

type CalendarWeekProps = {
  week: Day[];
};
