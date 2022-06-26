//js is a single thread programming language, 
//syncronus blocking behavior = waiter take order and go to kitchen and take the food serve and again take order,
//asyncronus behavior = waiter take order and go to kitchen and to to cook and come for next order, and again told to cook , after all cook done serve,or jeta age ranna shes hobe seta age serve krbe,
//here waiter is thread like single ,
//other language have multi thread ,
//window / document etc stay on runtime environment, 
//js to machine = js engine = v8,
//node js use v8 engine ,

//?how js works on browser, 
//engine er bitor 2ta jinis thake = 1)callstack,
//sobar age ekta main function js call kore, and then ekta ekta kore call kore,
//callstack e ekta kaj sesh hole cole jabe and new ta add hobe,
//callstack lifo way te kaj kroe,

//asyncronus funciton code wait in web api and after task done its go to callback queqe to run fifo way,
//event loop compare krbe callback and call stack, event callstack faka pele setai se callback queqe er task diye dibe,

//? how js asycronous task run with the help of event loop, callback queue and web api,
/**
 * 1)normal code run one by one on call stack to console by lifo way, 
 * 2)asyncronus code if found on call stack he pass it to web api and async code wait , 
 * 3)after web api done async task he pass the code to callback Queue and event loop check is call stack empty ? is all syncroouns code done then he push it to call stack on fifo method and then async code run one by one on console,,
 */

//beshi theke beshi asyce way te code krbo,
//async task jodi onno kono async task er upor nirbor kore amr jani na kobe task sesh hobe, then amr seta await krbo then porer ta call krbo,
// like fetch data and show,


//=========================================
//!underStanding of asyncronus js with callback running process, 
//?synchronous blocking processing running,
function serveOrder(){
    let currentTime = new Date().getTime();
    console.log("order processing 1");
    while((currentTime+3000)>=new Date().getTime());
    console.log("order served 1");
}

console.log("order taking start");
serveOrder();
console.log("order finally");

//?asyncronus processing running,
function serveOrder(){
    console.log("order processing 1");
    // while((currentTime+3000)>=new Date().getTime());
    setTimeout(()=>console.log("async running after 3 sec"),3000)
    //async function alway function after synchronous code, async function wait in web api box,
    setTimeout(()=>console.log("async running after 0 sec"),0)
    console.log("order served 1");
}

console.log("order taking start");
serveOrder();
console.log("order finally");


//?Asycronous task with callback function

function takeOrder(customer, callback) {
   console.log(`take order from ${customer}`);
   callback(customer);
}

function processOrder(customer, callback) {
   console.log(`processing order for ${customer}`);
   setTimeout(() => {
      console.log(`cooking completed`);
      callback(customer);
   }, 3000);
}

function completeOrder(customer) {
   console.log(`serve food to ${customer}`);
}

//takeOrder run and pass callback function to processOrder and processOrder run and pass callback completeOrder function, 
//one depend on other run,
//
takeOrder('customer1', (customer) => {
   processOrder(customer, (customer) => {
      completeOrder(customer);
   });
});

console.log('hello world');

//Issue of callback is it will make huge nested and bad code for understanding clear way,

//When use to callback function 
/**
 * when we need some code run after something done,
 * when we pass something to user done and give user some params after process in main function,
 * 
 */

//=========================================



//=================Promise Way ========================
//!promise successful hole resolve and fail hole rejected,
//promise use for handle asycronous oparation 


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



//=========================================
//===================Async Await Process ======================



function friendlyFunc(){
    return Promise.resolve("hellow");
}

console.log(friendlyFunc());

//if we need use await then it must be write on asyce function
//?return promise resolver and async function return is same like asyncronus function
async function friendlyFunc2(){
    return "hellow 2";
}
console.log(friendlyFunc2());

//Creating Promise here 
const hasMeeting = true;

const meeting = new Promise((resolver, rejected) => {
   if (hasMeeting) {
      rejected(new Error('Already a meeting has'));
   } else {
      resolver({ name: 'technical meeting', time: '10:00 PM' });
   }
});
//2nd promise 
const getSchedual = (meetingTime) => {
   return Promise.resolve(`Meeting set on ${meetingTime.time}`);
};


//asyce Process code to call promise,
async function getMeetingTime() {
   try { //this is for handling execution part of code, 
    //   const meetingTime = await meeting.catch((err)=>{console.log(err.message)}); //2nd way of catch value 
      const meetingTime = await meeting;
      const time = await getSchedual(meetingTime);
      console.log(time);
   } catch (err) { //this is for handling err part 
      console.log(err.message);
   }
}
getMeetingTime();
console.log('hello world');

//For then process of promise call
meeting
.then(getSchedual)
.then((time)=>console.log(time))
.catch(err=>console.log(err.message));

//=========================================


