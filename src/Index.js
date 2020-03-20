import React from 'react';
import { YellowBox } from "react-native";

import 'react-native-gesture-handler';
import './Config/StatusBarConfig';

YellowBox.ignoreWarnings(['componentWillUpdate is deprecated']);

import Routes from './routes';

const App = () => {
  return (
    <>
      <Routes />
    </>

  );
};

export default App;
