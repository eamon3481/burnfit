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

const useExpandableAnimation = (
  expanded: boolean,
  setExpanded: (prev: boolean) => void,
  itemHeight: number,
  itemsCnt: number,
) => {
  const [isWeekCalendar, setIsWeekCalendar] = useState(false);

  const listHeight = getListHeight({
    itemHeight,
    itemsCnt,
  });

  const duration = 1000;
  const height = useSharedValue(listHeight);
  const top = useSharedValue(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handleFold = () => {
    setExpanded(false);
  };

  const handleExpand = () => {
    setExpanded(true);
  };

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
        if (translateY.value - event.translationY > 0) {
          runOnJS(handleFold)();
        }
        if (translateY.value - event.translationY < 0) {
          runOnJS(handleExpand)();
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
