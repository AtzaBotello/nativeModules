import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import BatteryModule, { BatteryModuleEventEmitter } from "../NativeModules/batteryModule2";

const BatteryMonitor: React.FC = () => {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  useEffect(() => {
    const checkBattery = async () => {
      const level = await BatteryModule.getBatteryLevel();
      console.log("Battery Level:", level);
      setBatteryLevel(level);
      if (level < 20) {
        Alert.alert("Low Battery", "Your battery is below 20%!");
      }
    };

    const subscription = BatteryModuleEventEmitter.addListener(
      "BatteryLevelChanged",
      (level) => {
        console.log("Battery Level Changed:", level);
        setBatteryLevel(level);
        if (level < 20) {
          Alert.alert("Low Battery", "Your battery is below 20%!");
        }
      }
    );

    checkBattery();

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View>
      <Text>Battery Level: {batteryLevel !== null ? `${batteryLevel}%` : "Loading..."}</Text>
    </View>
  );
};

export default BatteryMonitor;