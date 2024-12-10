declare module "react-native-battery-module" {
    interface BatteryModuleType {
      getBatteryLevel(): Promise<number>;
    }
  
    const BatteryModule: BatteryModuleType;
    export default BatteryModule;
  }
  