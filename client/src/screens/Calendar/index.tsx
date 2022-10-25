import React, { useState } from 'react';
import { Button } from 'react-native';

import { CalendarContextProvider } from './components/CalendarProvider/CalendarProvider';
import * as S from './Calender.style';
import ExpandableList from '../../components/ExpandableList/ExpandableList';

const Calendar = () => {
  const [expand, setExpand] = useState(true);
  const current = new Date();
  return (
    <S.ScreenTemplate>
      <Button
        title={'접기'}
        onPress={() => {
          setExpand(prev => !prev);
        }}
      />

      <CalendarContextProvider initialDate={current}>
        <ExpandableList expanded={expand} itemHeight={40} />
      </CalendarContextProvider>
    </S.ScreenTemplate>
  );
};

export default Calendar;
