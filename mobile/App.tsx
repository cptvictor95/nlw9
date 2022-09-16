import { useEffect, useRef } from "react";
import { StatusBar } from "react-native";
import * as Notifications from "expo-notifications";

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import { Loading } from "./src/components/Loading";
import { Background } from "./src/components/Background";
import { Routes } from "./src/routes";

import "./src/services/notificationConfig";
import { Subscription } from "expo-modules-core";
import { getPushNotificationToken } from "./src/services/getPushNotificationToken";

export default function App() {
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  const getNotificationListener = useRef<Subscription>();
  const respondNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, []);

  useEffect(() => {
    getNotificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        notification;
      });

    respondNotificationListener.current =
      Notifications.addNotificationResponseReceivedListener(
        (response) => response
      );

    return () => {
      if (
        getNotificationListener.current &&
        respondNotificationListener.current
      ) {
        Notifications.removeNotificationSubscription(
          getNotificationListener.current
        );
        Notifications.removeNotificationSubscription(
          respondNotificationListener.current
        );
      }
    };
  }, []);

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {loaded ? <Routes /> : <Loading />}
    </Background>
  );
}
