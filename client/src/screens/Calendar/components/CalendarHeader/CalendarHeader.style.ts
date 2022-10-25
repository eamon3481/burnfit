import styled from 'styled-components/native';

export const CalendarHeader = styled.View`
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;

export const WeekList = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const Day = styled.View`
  width: ${100 / 7}%;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
