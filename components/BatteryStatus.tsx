import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, NativeModules, DeviceEventEmitter, Alert } from 'react-native';

import { getBatteryLevel, onBatteryLevelChange } from '../NativeModules/BatteryModule';

/*
interface BatteryModuleType {
  getBatteryLevel(): Promise<number>;
}
 
const { BatteryModule } = NativeModules;*/

const BatteryStatus = () => {
  const [batteryLevel, setBatteryLevel] = useState(null);

    /*(BatteryModule as BatteryModuleType)
      .getBatteryLevel()
      .then((level) => {
        console.log(`Battery level is ${level}%`);
        setBatteryLevel(level);
      })
      .catch((error) => {
        console.error(error);
      });*/

      useEffect(() => {
        getBatteryLevel().then((level) => {
          console.log(`Battery level is ${level}%`);
        setBatteryLevel(level);
        }).catch((error) => {
          console.error(error);
        });
    
        const subscription = onBatteryLevelChange(({ level }) => {
          setBatteryLevel(level);
          if (level < 20) {
            Alert.alert('Low Battery', 'Battery level is below 20%!');
          }
        });
    
        return () => subscription.remove();
      }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Battery Level:</Text>
      <Text style={styles.level}>
        {batteryLevel !== null ? `${batteryLevel}%` : 'Fetching...'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  level: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default BatteryStatus;