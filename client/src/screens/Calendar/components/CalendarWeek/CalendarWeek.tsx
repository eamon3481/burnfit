import React from 'react';
import { Day } from '../../../../utils';
import CalendarDay from '../CalendarDay/CalendarDay';
import * as S from './CalendarWeek.style';

const CalendarWeek = ({ week }: CalendarWeekProps) => {
  return (
    <S.WeekList>
      {week &&
        week.length > 0 &&
        week.map(day => <CalendarDay key={day.id} day={day} />)}
    </S.WeekList>
  );
};

export default React.memo(CalendarWeek);

type CalendarWeekProps = {
  week: Day[];
};
