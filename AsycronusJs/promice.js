const hasMeeting = false;

//when we make a promise we need to make a callback and send resolve and reject params on it,
//then for resolve and catch for rejected will run,
const meeting = new Promise((resolve, reject) => {
   if (hasMeeting) {
      reject(new Error('Already has meeting'));
   } else {
      const newMeeting = {
         name: 'Tecnical Meeting',
         location: 'Dhaka, Bangladesh',
         time: '10:00 PM',
      };
      resolve(newMeeting);
   }
});

//new promise add with resolver ,
const getSchedual = (newMeeting) => {
   const newTime = `new time has been set on ${newMeeting.location}`;
   return Promise.resolve(newTime);

   /*  return new Promise((resolve, rejected) => {
      const newTime = `new time has been set on ${newMeeting.location}`;
      resolve(newTime);
   }); */
};

meeting
   .then(getSchedual)
   .then((newMeeting) => {
      //then will get resolve value
      console.log(JSON.stringify(newMeeting));
   })
   .catch((err) => {
      //catch will get reject value //catch ektai thakbe 10 ta then thakleo ekta rejected holei se dorbe,
      console.log(err.message);
   });

console.log('hello syncronous code run first'); //it will run before promise ,

//Two promise write in two style,
const promise1 = Promise.resolve('promise 1');
const promise2 = new Promise((res, rej) => {
   setTimeout(() => {
      res('promise 2 after 3 sec ');
   }, 3000);
});

// promise2
// .then((res)=>console.log(res))

// Promise.race([promise1,promise2]) //it will race to promise and run the first one, 
Promise.all([promise1, promise2]) //2ta will run in same time,
   .then((res) => {
      console.log(res);
   });
