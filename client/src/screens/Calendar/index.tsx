import React from 'react';
import { Button, Text, View } from 'react-native';

import { CalendarContextProvider } from './components/CalendarProvider/CalendarProvider';
import { formatDate, getMonthDays } from '../../utils';
import useCalendar from '../../hooks/useCalendar';

import * as S from './Calender.style';
import CalendarBody from './components/CalendarBody/CalendarBody';

const Calendar = () => {
  const current = new Date();
  const { onNextMonth, onPrevMonth, year, month } = useCalendar(current);
  const days = getMonthDays(year, month);
  return (
    <S.ScreenTemplate>
      <S.CalendarHeader>
        <Button onPress={onPrevMonth} title={'이전'} />
        <View>
          <Text>
            {year} 년 {month} 월
          </Text>
        </View>
        <Button onPress={onNextMonth} title={'다음'} />
      </S.CalendarHeader>
      <CalendarContextProvider initialDate={formatDate(current)}>
        <CalendarBody days={days} />
      </CalendarContextProvider>
    </S.ScreenTemplate>
  );
};

export default Calendar;
