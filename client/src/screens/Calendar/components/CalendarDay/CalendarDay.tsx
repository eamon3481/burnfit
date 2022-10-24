import { Text } from 'react-native';
import React from 'react';
import * as S from './CalendarDay.style';
import { Day } from '../../../../utils';

const CalendarDay = ({ day }: { day: Day }) => {
  if (!day) {
    return <S.Day />;
  }
  return (
    <S.Day>
      <Text>{day.day}</Text>
    </S.Day>
  );
};

export default React.memo(CalendarDay);
