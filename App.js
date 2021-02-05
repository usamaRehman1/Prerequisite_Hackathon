import React from 'react';
import { Navigation } from './src/navigation/navigation'
import { BloddBankProvider } from './src/context/bloodBankContext'

const App = () => {
  return (
    <BloddBankProvider>
      <Navigation />
    </BloddBankProvider>
  );
};


export default App;
