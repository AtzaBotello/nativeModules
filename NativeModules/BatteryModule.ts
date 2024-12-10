import { NativeModules, NativeEventEmitter } from 'react-native';

type BatteryEvent = {
  level: number;
};

const { BatteryModule } = NativeModules;

const batteryEventEmitter = new NativeEventEmitter(BatteryModule);

export const getBatteryLevel = (): Promise<number> => {
  return BatteryModule.getBatteryLevel();
};

export const onBatteryLevelChange = (callback: (event: BatteryEvent) => void) => {
  return batteryEventEmitter.addListener('BatteryLevelChanged', callback);
};