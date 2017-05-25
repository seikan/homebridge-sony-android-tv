# homebridge-sony-android-tv

This is Sony Android TV plugin for [Homebridge](https://github.com/nfarina/homebridge). Add this to your Homebridge service to enable control to your Sony TV over Siri and Home app.

![sony-android-tv](https://cloud.githubusercontent.com/assets/73107/26430041/568078d2-411d-11e7-9e29-4811246369bf.jpg)

### Features

* Switch on / off the TV.
* Volume control. (Coming Soon)
* Mute / Unmute. (Coming Soon)




### Installation

1. Install required packages.

   ```
   npm install -g homebridge-sony-android-tv request
   ```

   ​

2. Enable **Remote Start** on Sony TV. Open TV Settings, go to **Network**, then set Remote Start to **On**.

   ![Enable Remote Start](https://cloud.githubusercontent.com/assets/73107/26430042/56817f5c-411d-11e7-81a9-2aafea78d505.jpg)

3. Now go to **Advanced Settings** -> **IP Control**.  Change the **Authentication** to `Normal and Pre-Shared Key`. Then set the **Pre-Shared Key** to any unique string you want.

   ![IP Control](https://cloud.githubusercontent.com/assets/73107/26430040/567dd2bc-411d-11e7-8bda-e1944a239b72.jpg)

4. Add these values to `config.json`.

   ```
     "accessories": [
       {
         "accessory": "SonyAndroidTV",
         "name": "Sony TV",
         "ip": "TV_IP_ADDRESS",
         "psk":"YOUR_PRE_SHARED_KEY"
       }
     ]
   ```

   ​

5. Restart Homebridge, and your Sony Android TV will be added to Home app.



### License

See the [LICENSE](https://github.com/seikan/homebridge-sony-android-tv/blob/master/LICENSE.md) file for license rights and limitations (MIT).



