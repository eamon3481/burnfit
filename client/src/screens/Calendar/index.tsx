import React from 'react';
import { Button, Text } from 'react-native';
import useCalendar from '../../hooks/useCalendar';
import * as S from './Calender.style';
const Calendar = () => {
  const current = new Date();
  const { onNextMonth, onPrevMonth, year, month } = useCalendar(current);

  return (
    <S.ScreenTemplate>
      <Text>
        {year} 년 {month} 월
      </Text>
      <Button onPress={onPrevMonth} title={'이전'} />
      <Button onPress={onNextMonth} title={'다음'} />
    </S.ScreenTemplate>
  );
};

export default Calendar;
