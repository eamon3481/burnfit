import { Button, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import Animated from 'react-native-reanimated';
import CalendarBody from '../../screens/Calendar/components/CalendarBody/CalendarBody';
import CalendarWeek from '../../screens/Calendar/components/CalendarWeek/CalendarWeek';
import useExpandableAnimation from '../../hooks/useExpandableAnimation';
import useCalendar from '../../hooks/useCalendar';
import CalendarHeader from '../../screens/Calendar/components/CalendarHeader/CalendarHeader';
import { PanGestureHandler } from 'react-native-gesture-handler';

const AnimatedView = Animated.createAnimatedComponent(View);

const ExpandableList = React.memo((props: ExpandableListProps) => {
  const { itemHeight = 0 } = props;

  const current = new Date();

  const [expanded, setExpanded] = useState(true);

  current.setDate(1);
  const { days, year, month, handleNextBtn, handlePrevBtn, week, setWeek } =
    useCalendar(current);

  const handleVerticalScroll = (direction: 'up' | 'down') => {
    setWeek(0);
    if (direction === 'up') {
      setExpanded(false);
      return;
    }
    setExpanded(true);
  };

  const handleHorizontalScroll = useCallback(
    (direction: 'right' | 'left') => {
      if (direction === 'right') {
        handleNextBtn(!expanded)();
        return;
      }
      handlePrevBtn(!expanded)();
    },
    [expanded],
  );

  const {
    onPanGestureEvent,
    topAnimationStyle,
    hightAnimationStyle,
    isWeekCalendar,
  } = useExpandableAnimation({
    expanded,
    itemHeight,
    itemsCnt: days.length,
    handleVerticalScroll,
    handleHorizontalScroll,
  });

  return (
    <>
      <Button
        title={'접기'}
        onPress={() => {
          setExpanded(prev => !prev);
          setWeek(0);
        }}
      />
      <CalendarHeader
        handleNextBtn={handleNextBtn(!expanded)}
        handlePrevBtn={handlePrevBtn(!expanded)}
        year={year}
        month={month}
      />
      <PanGestureHandler onGestureEvent={onPanGestureEvent}>
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
      </PanGestureHandler>
    </>
  );
});
export default React.memo(ExpandableList);

type ExpandableListProps = {
  itemHeight: number;
};
