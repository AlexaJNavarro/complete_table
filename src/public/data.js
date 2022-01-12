const socket = io();

let number = document.getElementById("number");
let number_one = document.getElementById("number_one");
let number_two = document.getElementById("number_two");
let total = document.getElementById("number_total");

let API_URL = "http://localhost:3008/data/61df0911749dc286aad4c66a"

window.addEventListener("load", () => {
  console.log("windows se cargo");
});

number.addEventListener("keyup", () => {
  socket.emit("chat:everybody", {
    number: number.value,
    number_one: number_one.value,
    number_two: number_two.value,
  });
});

number_one.addEventListener("keyup", () => {
  socket.emit("chat:everybody", {
    number: number.value,
    number_one: number_one.value,
    number_two: number_two.value,
  });
});

number_two.addEventListener("keyup", () => {
  socket.emit("chat:everybody", {
    number: number.value,
    number_one: number_one.value,
    number_two: number_two.value,
  });
});

socket.on("chat:everybody", (data) => {
  number.value = data.number;
  number_one.value = data.number_one;
  number_two.value = data.number_two;
  console.log(data);
  total.value = Number(data.number) + Number(data.number_one) + Number(data.number_two);

});
