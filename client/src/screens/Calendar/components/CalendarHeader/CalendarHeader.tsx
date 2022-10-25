import { View, Text } from 'react-native';
import React from 'react';
import * as S from './CalendarHeader.style';
import IconButton from '../../../../components/IconButton/IconButton';
import { DAYS } from '../../../../utils';
const CalendarHeader = ({
  handleNextBtn,
  handlePrevBtn,
  year,
  month,
}: CalendarHeaderProps) => {
  return (
    <>
      <S.CalendarHeader>
        <IconButton onPress={handlePrevBtn} size={24} iconName={'caret-back'} />
        <View>
          <Text>
            {year} 년 {month + 1} 월
          </Text>
        </View>
        <IconButton
          onPress={handleNextBtn}
          size={24}
          iconName={'caret-forward'}
        />
      </S.CalendarHeader>
      <S.WeekList>
        {DAYS.map(day => (
          <S.Day key={day}>
            <Text>{day}</Text>
          </S.Day>
        ))}
      </S.WeekList>
    </>
  );
};

export default React.memo(CalendarHeader);

type CalendarHeaderProps = {
  handleNextBtn: () => void;
  handlePrevBtn: () => void;
  year: number;
  month: number;
};
