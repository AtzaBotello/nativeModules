//
//  BatteryModule.m
//  TurboModuleExample
//
//  Created by Alberto Atzayacatl Botello Villarreal on 09/12/24.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import <React/RCTEventEmitter.h>

@interface 
RCT_EXTERN_MODULE(BatteryModule, RCTEventEmitter);
RCT_EXTERN_METHOD(getBatteryLevel:
                  (RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock))
@end
