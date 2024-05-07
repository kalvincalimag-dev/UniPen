import React, { useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native'
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import TabNavigator from "./app/navigation/TabNavigator";
import NoInternet from "./app/components/NoInternet";
import { useNetInfo } from "@react-native-community/netinfo";

const CUSTOM_THEME = { ...DefaultTheme, colors: {...DefaultTheme.colors, background: '#EEEEEE'}}

const App = () => {
  const [noInternet, setNoInternet] = useState(false);
  const netInfo = useNetInfo();


  // DGN3
  const fetchNetInfo = () => {
    const {isConnected, isInternetReachable} = netInfo
    if(isConnected === false && isInternetReachable === false)
      setNoInternet(true)
    else
      setNoInternet(false)
  }

  useEffect(() =>{
    fetchNetInfo();
  }, [netInfo]);

  if (noInternet) return <NoInternet onRefreshPress={fetchNetInfo}/>
  return (
    <NavigationContainer theme={CUSTOM_THEME}>
      <TabNavigator/>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  container: {},
});

export default App;
