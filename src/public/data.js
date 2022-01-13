const socket = io();

let number = document.getElementById("number");
let number_one = document.getElementById("number_one");
let number_two = document.getElementById("number_two");
let total = document.getElementById("number_total");

let API_URL = "http://localhost:3008/data";

window.addEventListener("load", () => {
  axios({
    method: "GET",
    url: `${API_URL}/61df0911749dc286aad4c66a`,
  })
    .then((res) => {
      number.value = res.data.data[0].number;
      number_one.value = res.data.data[0].number_one;
      number_two.value = res.data.data[0].number_two;
      total.value =
        res.data.data[0].number +
        res.data.data[0].number_one +
        res.data.data[0].number_two;
    })
    .catch((err) => {
      console.log("ERROR");
      console.log(err);
    });
});

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
  axios({
    method: "PUT",
    url: `${API_URL}/61df0911749dc286aad4c66a`,
    data: body,
  })
    .then((res) => {
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
