//
//  BatteryModule.swift
//  TurboModuleExample
//
//  Created by Alberto Atzayacatl Botello Villarreal on 09/12/24.
//

import Foundation
import UIKit
import React

@objc(BatteryModule)
class BatteryModule: NSObject {
  
  /*override init(){
    super.init();
    UIDevice.current.isBatteryMonitoringEnabled = true;
  }*/
  
  static func requiresMainQueueSetup() -> Bool {
          return false
      }
  /*
  override func constantsToExport() -> [AnyHashable: Any]! {
          return [:]
      }

      override func supportedEvents() -> [String]! {
          return ["BatteryLevelChanged"]
      }

      override func startObserving() {
        hasListeners = true;
        UIDevice.current.isBatteryMonitoringEnabled = true;
          NotificationCenter.default.addObserver(
              self,
              selector: #selector(batteryLevelChanged),
              name: UIDevice.batteryLevelDidChangeNotification,
              object: nil
          )
      }

      override func stopObserving() {
        hasListeners = false;
          NotificationCenter.default.removeObserver(self, name: UIDevice.batteryLevelDidChangeNotification, object: nil)
      }

      @objc func batteryLevelChanged() {
          let batteryLevel = UIDevice.current.batteryLevel * 100
          self.sendEvent(withName: "BatteryLevelChanged", body: ["level": batteryLevel])
      }*/

      @objc func getBatteryLevel(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
          UIDevice.current.isBatteryMonitoringEnabled = true
          let batteryLevel = UIDevice.current.batteryLevel * 100
          if batteryLevel >= 0 {
              resolve(batteryLevel)
          } else {
              reject("Error", "Battery level unavailable", nil)
          }
      }
}