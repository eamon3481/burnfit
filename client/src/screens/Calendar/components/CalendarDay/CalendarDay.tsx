import { Text, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback } from 'react';
import * as S from './CalendarDay.style';
import { Day } from '../../../../utils';
import {
  useCalendarContext,
  useUpdateCalendarContext,
} from '../CalendarProvider/CalendarProvider';

const CalendarDay = ({ day }: { day: Day }) => {
  const selectedDay = useCalendarContext();
  const setSelectedDay = useUpdateCalendarContext();

  const handlePress = useCallback(() => {
    console.log('day');
    if (!day) {
      return;
    }

    setSelectedDay(day.id);
  }, [day]);

  if (!day) {
    return <S.Day />;
  }

  return (
    <S.Day>
      <TouchableWithoutFeedback onPress={handlePress}>
        {day.id === selectedDay ? (
          <S.SelectedDayWrapper>
            <Text>{day.day}</Text>
          </S.SelectedDayWrapper>
        ) : (
          <Text>{day.day}</Text>
        )}
      </TouchableWithoutFeedback>
    </S.Day>
  );
};

export default React.memo(CalendarDay);
