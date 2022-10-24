import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const ScreenTemplate = styled(SafeAreaView)`
  width: 100%;
  padding: 20px;
  flex: 1;
`;

export const CalendarHeader = styled.View`
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;
