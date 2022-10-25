import { View } from 'react-native';
import React, { useState } from 'react';
import Animated from 'react-native-reanimated';
import CalendarBody from '../../screens/Calendar/components/CalendarBody/CalendarBody';
import { getBeforeMonthDaysLength, getMonthDays } from '../../utils';
import CalendarWeek from '../../screens/Calendar/components/CalendarWeek/CalendarWeek';
import useExpandableAnimation from '../../hooks/useExpandableAnimation';
import useCalendar from '../../hooks/useCalendar';
import CalendarHeader from '../../screens/Calendar/components/CalendarHeader/CalendarHeader';

const AnimatedView = Animated.createAnimatedComponent(View);

const ExpandableList = React.memo((props: ExpandableListProps) => {
  const { expanded, itemHeight = 0 } = props;

  const current = new Date();
  current.setDate(1);
  const { onNextMonth, onPrevMonth, year, month } = useCalendar(current);

  const days = getMonthDays(year, month);
  const prevDaysLength = getBeforeMonthDaysLength(year, month);

  const { topAnimationStyle, hightAnimationStyle, isWeekCalendar } =
    useExpandableAnimation(expanded, itemHeight, days.length);

  const [week, setWeek] = useState(0);

  const onNextWeek = () => {
    if (week === days.length - 1) {
      setWeek(0);
      onNextMonth();
      return;
    }
    setWeek(prev => ++prev);
  };

  const onPrevWeek = async () => {
    if (week === 0) {
      onPrevMonth();
      setWeek(prevDaysLength - 1);
      return;
    }
    setWeek(prev => --prev);
  };

  return (
    <>
      <CalendarHeader
        handleNextBtn={expanded ? onNextMonth : onNextWeek}
        handlePrevBtn={expanded ? onPrevMonth : onPrevWeek}
        year={year}
        month={month}
      />
      <AnimatedView
        style={[
          {
            position: 'relative',
            overflow: 'hidden',
          },
          hightAnimationStyle,
        ]}>
        <AnimatedView
          style={[
            {
              position: 'absolute',
            },
            topAnimationStyle,
          ]}>
          {isWeekCalendar ? (
            <CalendarBody days={days} />
          ) : (
            <CalendarWeek week={days[week]} />
          )}
        </AnimatedView>
      </AnimatedView>
    </>
  );
});
export default React.memo(ExpandableList);

type ExpandableListProps = {
  itemHeight: number;
  expanded: boolean;
};
