import React, { useEffect, useState } from "react";
import {View, ScrollView} from 'react-native';
import LocalAPI from "./LocalAPI";
import CallAPIVanilla from "../pages/CallAPIVanilla";
import CallAPIAxios from "../pages/CallAPIAxios";

const App = () => {
  const [isShow, SetIsShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      SetIsShow(false);
    }, 6000);
  }, []);
  return (
    <View>
      <ScrollView>
        <LocalAPI />
        {/* <CallAPIVanilla /> */}
        {/* < CallAPIAxios /> */}
      </ScrollView>
    </View>
  );
};

export default App;