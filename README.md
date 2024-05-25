# Restaurant Management Mobile App

## :star2: Introduction

A mobile app for managing your own Thai hotpot restaurant. There're 4 actors in our system: administrator(s), staff(s), kitchen manager(s) and cashier(s).

Each actor will have their own activities. **Staff** can confirm guest's infors to using table, order for guest(s) and serve dishes. **Kitchen manager** is a role that control all ordered dishes. **Cashier** will get pre-order from guests and control payment. **Administrator** will control the whole processes in the system.

## :question: What's in this repository

Our project use React Native for front-end and Node.js + Firebase database for server side. This is some important part in our structure:
```
|_Firebase/ 
      |_fireabse.js --> code for initialize connection to Firebase database

|_src/
      |_screens --> all front-end codes
            |_admin/ --> all code for admin role
            |_staff/ --> all code for staff role
            |_cashier/ --> all code for cashier role
            |_kitche_manager/ --> all code for kitchen manager role
      |_utils/
            |_auth.js --> all code involved in authentication
            |_firestore.js --> all codes for server side
```

## :wrench: Installation

Requirements:
* Expo CLI 6.3.10
* Expo SDK 51.0.8
* Node.js >= 18.15.0
* npm >= 9.5.0
  
Step-by-step introductions to get you running this app:
### 1) Clone this repository to your local machine:

```bash
git clone https://github.com/vanhsusu03/Restaurant-Management-App.git 
```
### 2) Running the client side

```bash
npm install (or npm i)
npx expo start/npm start
```

After that, you will see this screen: ![image](https://github.com/vanhsusu03/Restaurant-Management-App/assets/98511848/9b73b0f9-3cfe-4719-be10-3d046ebcd4d7)

You can use Expo Go app (download from your mobile device) scan QR and start running this app. Or, you can use Android Simulator extension for running on some IDE like Visual Studio Code, or running directly by using virtual device on Adroid Studio.

## :raising_hand: Questions
If you have any questions about running this code, or this project, contact us - the developers: 
* Tran Dieu Anh (21020279@vnu.edu.vn)
* Cao Trong Duc (21020303@vnu.edu.vn)
* Luong Thi Mai Phuong (21020783@vnu.edu.vn)
* Duong Nguyen Viet Anh (dnvietanvnuuet@gmail.com/dnvietanhctn@gmail.com)
  
