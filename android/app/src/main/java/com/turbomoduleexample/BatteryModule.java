package com.turbomoduleexample;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class BatteryModule extends ReactContextBaseJavaModule {
        public BatteryModule(ReactApplicationContext reactContext) {
            super(reactContext);

            // Register a bradocast receiver
            BroadcastReceiver batteryReceiver = new BroadcastReceiver() {
                @Override
                public void onReceive(Context context, Intent intent) {
                    int level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
                    sendEvent("BatteryLevelChanged", createBatteryLevelMap(level));
                }
            };
            IntentFilter filter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
            reactContext.registerReceiver(batteryReceiver, filter);
        }

        @Override
        public String getName() {
            return "BatteryModule";
        }

        @ReactMethod
        public void getBatteryLevel(Promise promise) {
            try {
                Intent batteryIntent = getReactApplicationContext().registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
                int level = batteryIntent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
                int scale = batteryIntent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
                float batteryPct = level * 100 / (float)scale;
                promise.resolve(batteryPct);
            } catch (Exception e) {
                promise.reject("E_BATTERY_LEVEL", "Battery level unavailable", e);
            }
        }

        private void sendEvent(String eventName, WritableMap params) {
            if (getReactApplicationContext().hasActiveReactInstance()) {
                getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
            }
        }

        private WritableMap createBatteryLevelMap(int level) {
            WritableMap map = Arguments.createMap();
            map.putInt("level", level);
            return map;
        }

        @ReactMethod
        public void getConsoleLog(Callback callback) {
            callback.invoke(null, "is working");
        }
    }
