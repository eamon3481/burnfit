import { useEffect, useState } from 'react';
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import {
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type ExpandableAnimationProps = {
  expanded: boolean;
  handleVerticalScroll: (direction: 'up' | 'down') => void;
  handleHorizontalScroll: (direction: 'right' | 'left') => void;
  itemHeight: number;
  itemsCnt: number;
  duration?: number;
};

const useExpandableAnimation = ({
  expanded,
  itemHeight,
  itemsCnt,
  duration = 1000,
  handleVerticalScroll,
  handleHorizontalScroll,
}: ExpandableAnimationProps) => {
  const [isWeekCalendar, setIsWeekCalendar] = useState(false);

  const listHeight = getListHeight({
    itemHeight,
    itemsCnt,
  });

  const height = useSharedValue(listHeight);
  const top = useSharedValue(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const hightAnimationStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const topAnimationStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
    };
  });

  useEffect(() => {
    if (expanded) {
      setIsWeekCalendar(expanded);
    }
    height.value = withTiming(
      expanded ? listHeight : itemHeight,
      {
        duration,
        easing: Easing.bezier(0.1, 0.76, 0.5, 1),
      },
      finished => {
        if (finished) {
          if (!expanded) {
            runOnJS(setIsWeekCalendar)(expanded);
          }
        }
      },
    );
    top.value = withTiming(expanded ? 0 : -1 * 0, {
      duration,
      easing: Easing.bezier(0.1, 0.76, 0.5, 1),
    });
  }, [expanded]);

  const onPanGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: event => {
        translateX.value = event.translationX;
        translateY.value = event.translationY;
      },

      onEnd: event => {
        const relativeY = translateY.value - event.translationY;
        const relativeX = translateX.value + event.translationX;

        if (Math.abs(relativeY) > Math.abs(relativeX)) {
          if (relativeY > 0) {
            runOnJS(handleVerticalScroll)('up');
            return;
          }
          if (relativeY < 0) {
            runOnJS(handleVerticalScroll)('down');
            return;
          }
        }

        if (relativeY > 0) {
          runOnJS(handleHorizontalScroll)('right');
          return;
        }
        if (relativeY < 0) {
          runOnJS(handleHorizontalScroll)('left');
          return;
        }
      },
    });

  return {
    isWeekCalendar,
    hightAnimationStyle,
    topAnimationStyle,
    onPanGestureEvent,
  };
};

export const getListHeight = ({
  itemsCnt,
  itemHeight,
}: {
  itemsCnt: number;
  itemHeight: number;
}) => {
  return itemsCnt * itemHeight + 1;
};

export default useExpandableAnimation;
