import { View, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
const IconButton = ({ onPress, iconName, size }: IconButtonProps) => {
  return (
    <View>
      <TouchableWithoutFeedback onPress={onPress}>
        <IonIcons name={iconName} size={size} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default React.memo(IconButton);

type IconButtonProps = {
  onPress: () => void;
  iconName: 'caret-back' | 'caret-forward';
  size: number;
};
