import * as firebase from 'firebase'; //take all name exports

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

//db() provide access to db-related features
const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
    'prompt': 'select_account'
   });

export { firebase, googleAuthProvider, database as default };

//---------------------------------------------------------

// //child removed
// db.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// //child changed
// db.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// //child added, also called for existing ones
// db.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

//-----------------------------------------------------

// db.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//        const expenses = [];

//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });

//         console.log(expenses);
//     });

//subscription version
// db.ref('expenses')
//     .on('value', () => {
//         const expenses = [];

//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });

//         console.log(expenses);
//     });

//------------------------------------------------------

// db.ref('notes').push({
//     title: 'todo',
//     body: 'new note'
// });

// const notes = [{
//     id: '12',
//     title: 'title1',
//     body: 'message1'
// },{
//     id: '34',
//     title: 'title2',
//     body: 'message2'
// }];

// db.ref('notes').set(notes);

// db.ref().on('value',(snapshot) => {
//     const name = snapshot.val().name;
//     const job = snapshot.val().job;
//     console.log(`${name} is a ${job}.`);
// });

//fetch data, return a promise object
// db.ref()
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((e) => {
//         console.log('Error fetching data', e);
//     });

//------------------------------------------------------------

//notified by server everytime data changes
// db.ref().on('value', (snapshot) => {
//     console.log(snapshot.val());
// });

// setTimeout(() => {
//     db.ref().off(); //unsubcribe from notifications of changes
// },3000);

//---------------------------------------------------------

//ref() provides reference to a specific db
// db.ref().set({
//     name: 'Duong Lam',
//     age: 28,
//     location: {
//         city: 'Melbourne',
//         state: 'VIC'
//     },
//     job: 'student'
// }).then(() => {
//     console.log('Data is saved!');
// }).catch((e) => {
//     console.log('Failed.', e);
// }); 

// db.ref().set('this is a string'); //set() does not need to take an object

// db.ref().set({age:25}); //overwrite the whole reference

// db.ref('age').set(25); //update a value
// db.ref('location/city').set('Sydney');

// db.ref('attributes').set({ //add new value
//     height: 175,
//     weight: 70
// });

// db.ref('age').remove().then(() => {
//     console.log('Data was removed.');
// }).catch((e) => {
//     console.log('Data was not removed.');
// });
//passing null to set() is the same as remove()

//must pass an object
// db.ref().update({
//     name: 'Andy',
//     job: 'student', //add new
//     age: null, //remove
//     'location/city': 'Ballarat' //update child level
// }); //only update root level