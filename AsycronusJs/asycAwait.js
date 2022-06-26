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
