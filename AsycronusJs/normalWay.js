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
