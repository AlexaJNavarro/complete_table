const socket = io();

let number = document.getElementById("number");
let number_one = document.getElementById("number_one");
let number_two = document.getElementById("number_two");
let total = document.getElementById("number_total");

let API_URL = "http://localhost:3008/data";
const xhr = new XMLHttpRequest();

//ACTUALIZAR NUEVOS CAMPOS
let formData = new FormData();
formData.append("number", number.value);
formData.append("number_one", number_one.value);
formData.append("number_two", number_two.value);
formData.append(
  "total",
  Number(number.value) + Number(number_one.value) + Number(number_two.value)
);

//VALIDAR RESPUESTA Y LLENAR DATA EN SUS RESPECTIVOS CAMPOS
function onRequestHandler() {
  if (this.readyState === 4 && this.status === 200) {
    const data = JSON.parse(this.response);
    number.value = data.data[0].number;
    number_one.value = data.data[0].number_one;
    number_two.value = data.data[0].number_two;
    total.value = data.data[0].total;
  }
}

//REFRESCAR PAGINA Y ENVIAR QUERY
xhr.addEventListener("load", onRequestHandler);
xhr.open("GET", `${API_URL}/61df0911749dc286aad4c66a`);
xhr.send();

//SOCKET IO
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
  total.value =
    Number(data.number) + Number(data.number_one) + Number(data.number_two);
});
