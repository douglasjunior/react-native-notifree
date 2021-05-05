# React-Native NotiFREE

[![Licence MIT](https://img.shields.io/badge/licence-MIT-blue.svg)](https://github.com/douglasjunior/react-native-notifree/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/react-native-notifree.svg)](https://www.npmjs.com/package/react-native-notifree)
[![npm downloads](https://img.shields.io/npm/dt/react-native-notifree.svg)](#install)

⚛ React Native library to display local notifications. A FREE alternative to [React Native NotiFEE](https://github.com/notifee/react-native-notifee).

## Why?

Nobody can remove the gratitude that the **React Native community** has towards [Invertase](https://github.com/invertase), for creating and maintaining, for so many years, the [React Native Firebase](https://github.com/invertase/react-native-firebase) library. BUT, in my opinion, that does not give them the right to do what they did.

They deprecated and **REMOVED** the API to accessing local notifications from within **React Native Firebase 6**, and created a closed library called **Notifee**, forcing all projects that depends on **React Native Firebase** to purchase a **Notifee** license. For me, this is a lack of fair play. 

**React Native NotiFREE** recovers the Local Notification API from [React Native Firebase 5](https://github.com/douglasjunior/react-native-notifree/tree/react-native-firebase-5), allowing projects that use React Native Firebase to keep working without purchase extra licenses. 

## Requirements

- React Native >= 0.60
- iOS >= 9.0
- Android >= 21.0

## Roadmap

- [x] Local notifications API
- [ ] Update the docs
- [ ] Remove remnants of react-native-firebase 
- [ ] Fix index.d.ts
- [ ] Scheduled notifications

## Install

Install dependency package
```bash
yarn add react-native-notifree
```
Or
```bash
npm i -S react-native-notifree
```

If you are using `React Native 0.60.+` go to the folder **your-project/ios** and run `pod install`, and you're done. 

## Usage and Documentation

*In progress..*

See the [documentation](https://github.com/douglasjunior/react-native-notifree/tree/master/docs) folder. 

## Contribute

New features, bug fixes and improvements are welcome! For questions and suggestions use the [issues](https://github.com/douglasjunior/react-native-notifree/issues).

<a href="https://www.patreon.com/douglasjunior"><img src="http://i.imgur.com/xEO164Z.png" alt="Become a Patron!" width="200" /></a>
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/douglasnassif)

## Licence

```
The MIT License (MIT)

Copyright (c) 2021 Douglas Nassif Roma Junior
```

See the full [licence file](https://github.com/douglasjunior/react-native-notifree/blob/master/LICENSE).
