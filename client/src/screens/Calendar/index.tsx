import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

import { CalendarContextProvider } from './components/CalendarProvider/CalendarProvider';
import { DAYS, getMonthDays } from '../../utils';
import useCalendar from '../../hooks/useCalendar';

import * as S from './Calender.style';
import IconButton from '../../components/IconButton/IconButton';
import ExpandableList from '../../components/ExpandableList/ExpandableList';
import { WeekList, Day } from './components/CalendarBody/CalendarBody.style';

const Calendar = () => {
  const current = new Date();
  const { onNextMonth, onPrevMonth, year, month } = useCalendar(current);
  const days = getMonthDays(year, month);
  console.log(days);
  const [expand, setExpand] = useState(false);
  return (
    <S.ScreenTemplate>
      <Button
        title={'접기'}
        onPress={() => {
          console.log('expand');
          setExpand(prev => !prev);
        }}
      />
      <S.CalendarHeader>
        <IconButton onPress={onPrevMonth} size={24} iconName={'caret-back'} />
        <View>
          <Text>
            {year} 년 {month} 월
          </Text>
        </View>
        <IconButton
          onPress={onNextMonth}
          size={24}
          iconName={'caret-forward'}
        />
      </S.CalendarHeader>
      <CalendarContextProvider initialDate={current}>
        <WeekList>
          {DAYS.map(day => (
            <Day key={day}>
              <Text>{day}</Text>
            </Day>
          ))}
        </WeekList>
        <ExpandableList expanded={expand} itemHeight={40} data={days} />
      </CalendarContextProvider>
    </S.ScreenTemplate>
  );
};

export default Calendar;
