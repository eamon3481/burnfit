import styled from 'styled-components/native';

export const Day = styled.View`
  width: ${100 / 7}%;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

export const SelectedDayWrapper = styled.View`
  border-radius: 30px;
  border: #19aaf6 2px;
  width: 40px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const DayText = styled.Text<{ disabled: boolean }>`
  color: ${props => (props.disabled ? '#3033' : '#333')};
`;
