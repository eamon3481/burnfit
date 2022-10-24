import { Text } from 'react-native';
import React from 'react';
import * as S from './CalendarBody.style';
import { Day, DAYS } from '../../../../utils';
import CalendarWeek from '../CalendarWeek/CalendarWeek';

const CalendarBody = ({ days }: CalendarBodyProps) => {
  return (
    <>
      <S.WeekList>
        {DAYS.map(day => (
          <S.Day key={day}>
            <Text>{day}</Text>
          </S.Day>
        ))}
      </S.WeekList>
      {days.map(week => (
        <CalendarWeek week={week} />
      ))}
    </>
  );
};

export default React.memo(CalendarBody);

type CalendarBodyProps = { days: (Day | null)[][] };
