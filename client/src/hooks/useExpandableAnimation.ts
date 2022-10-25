import { useEffect, useState } from 'react';
import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const useExpandableAnimation = (
  expanded: boolean,
  itemHeight: number,
  itemsCnt: number,
) => {
  const [isWeekCalendar, setIsWeekCalendar] = useState(false);

  const listHeight = getListHeight({
    itemHeight,
    itemsCnt,
  });

  const duration = 2000;
  const height = useSharedValue(listHeight);
  const top = useSharedValue(0);

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

  return {
    isWeekCalendar,
    hightAnimationStyle,
    topAnimationStyle,
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
