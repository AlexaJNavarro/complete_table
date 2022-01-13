const socket = io();

let number = document.getElementById("number");
let number_one = document.getElementById("number_one");
let number_two = document.getElementById("number_two");
let total = document.getElementById("number_total");

let API_URL = "http://localhost:3008/data";
// const xhr = new XMLHttpRequest();

// //CONSUMIENDO ENDPOINT <<GET ALL DATA>>
// function onRequestHandler() {
//   if (this.readyState === 4 && this.status === 200) {
//     const data = JSON.parse(this.response);
//     number.value = data.data[0].number;
//     number_one.value = data.data[0].number_one;
//     number_two.value = data.data[0].number_two;
//     total.value = data.data[0].total;
//   }
// }
// xhr.addEventListener("load", onRequestHandler);
// xhr.open("GET", `${API_URL}/61df0911749dc286aad4c66a`);
// xhr.send();

//CONSUMIENDO ENDPOINT <<UPDATE DATA>>
function update() {
  var body = {
    number: number.value,
    number_one: number_one.value,
    number_two: number_two.value,
    total:
      Number(number.value) +
      Number(number_one.value) +
      Number(number_two.value),
  };

  console.log("body");
  console.log(body);
  axios({
    method: "PUT",
    url: `${API_URL}/61df0911749dc286aad4c66a`,
    data: body,
  })
    .then((res) => {
      console.log("UPDATE");
      console.log(res);
    })
    .catch((err) => {
      console.log("ERROR");
      console.log(err);
    });
}

//SOCKET IO
number.addEventListener("keyup", async () => {
  socket.emit("chat:everybody", {
    number: number.value,
    number_one: number_one.value,
    number_two: number_two.value,
  });
  update();
});

number_one.addEventListener("keyup", () => {
  socket.emit("chat:everybody", {
    number: number.value,
    number_one: number_one.value,
    number_two: number_two.value,
  });
  update();
});

number_two.addEventListener("keyup", () => {
  socket.emit("chat:everybody", {
    number: number.value,
    number_one: number_one.value,
    number_two: number_two.value,
  });
  update();
});

socket.on("chat:everybody", (data) => {
  number.value = data.number;
  number_one.value = data.number_one;
  number_two.value = data.number_two;
  total.value =
    Number(data.number) + Number(data.number_one) + Number(data.number_two);
});
