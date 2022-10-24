import { ListRenderItemInfo, View } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CalendarBody from '../../screens/Calendar/components/CalendarBody/CalendarBody';
import { Day } from '../../utils';

const AnimatedCircle = Animated.createAnimatedComponent(View);

const ExpandableList = React.memo((props: ExpandableFlatListProps) => {
  const { expanded, data = [], itemHeight = 0 } = props;

  const listHeight = getListHeight({
    itemHeight,
    itemsCnt: data.length,
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
    height.value = withTiming(expanded ? listHeight : itemHeight, {
      duration,
      easing: Easing.bezier(0.1, 0.76, 0.5, 1),
    });
    top.value = withTiming(expanded ? 0 : -1 * itemHeight, {
      duration,
      easing: Easing.bezier(0.1, 0.76, 0.5, 1),
    });
  }, [expanded]);

  return (
    <>
      <AnimatedCircle
        style={[
          {
            position: 'relative',
            width: '100%',
            height: height.value,
            overflow: 'hidden',
          },
          hightAnimationStyle,
        ]}>
        <AnimatedCircle
          style={[
            {
              position: 'absolute',
            },
            topAnimationStyle,
          ]}>
          <CalendarBody days={data} />
        </AnimatedCircle>
      </AnimatedCircle>
    </>
  );
});
export default React.memo(ExpandableList);

type ExpandableFlatListProps = {
  itemHeight: number;
  expanded: boolean;
  data: Day[][];
};

export type ExpandableListRenderItem<T> = (
  info: Omit<ListRenderItemInfo<T>, 'separators'>,
) => React.ReactElement;

export const getListHeight = ({
  itemsCnt,
  itemHeight,
}: {
  itemsCnt: number;
  itemHeight: number;
}) => {
  return itemsCnt * itemHeight + 1;
};
