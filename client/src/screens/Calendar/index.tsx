import React from 'react';

import { CalendarContextProvider } from './components/CalendarProvider/CalendarProvider';
import * as S from './Calender.style';
import ExpandableList from '../../components/ExpandableList/ExpandableList';

const Calendar = () => {
  const current = new Date();
  return (
    <S.ScreenTemplate>
      <CalendarContextProvider initialDate={current}>
        <ExpandableList itemHeight={40} />
      </CalendarContextProvider>
    </S.ScreenTemplate>
  );
};

export default Calendar;
