import { TouchableWithoutFeedback } from 'react-native';
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
    if (!day.isCurrentMonth) {
      return;
    }

    setSelectedDay(day.id);
  }, [day]);

  return (
    <S.Day>
      <TouchableWithoutFeedback onPress={handlePress}>
        {day.id === selectedDay ? (
          <S.SelectedDayWrapper>
            <S.DayText disabled={!day.isCurrentMonth}>{day.day}</S.DayText>
          </S.SelectedDayWrapper>
        ) : (
          <S.DayText disabled={!day.isCurrentMonth}>{day.day}</S.DayText>
        )}
      </TouchableWithoutFeedback>
    </S.Day>
  );
};

export default React.memo(CalendarDay);
