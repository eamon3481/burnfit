import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import TabNavigation from './src/navigation/BottomTabs';

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TabNavigation />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
