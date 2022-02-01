const socket = io();
let parametro = "idFormat=61bac5b39489bed4ca6c9114";
let tableData = document.getElementById("tableData");
let btn = document.getElementById("btn");
let btnStart = document.getElementById("btnStart");
let raiz = {
  createUser: "61b7ec7c7718c438123136d9",
  idFormat: "61bac5b39489bed4ca6c9114",
};

function list() {
  axios({
    method: "GET",
    url: `http://localhost:3003/data?${parametro}`,
  })
    .then((res) => {
      console.log("RESPONSE LIST => ", res)
      let response = res.data.data[0].data;
      for (let index = 0; index < response.length; index++) {
        tableData.innerHTML += `<tr id=tr_${index}></tr>`;
        let tr = document.getElementById(`tr_${index}`);
        tr.innerHTML += `
                         <td><input id="i_${index}" type="number" value=${
          response[index].value[0].data
        }></td>
                         <td><input id="i_${index}" type="number" value=${
          response[index].value[1].data
        }></td>
                         <td><input id="i_${index}" type="number" value=${
          response[index].value[2].data
        }></td>
                         <td><input id="i_${index}" type="number" value=${
          response[index].value[3].data
        }></td>
                         <td><input id="i_${index}" type="number" value=${
          response[index].value[4].data
        }></td>
                         <td><input id="i_${index}" type="number" value=${
          response[index].value[5].data
        }></td>
                         <td><input id="i_${index}" type="number" value=${
          Number(response[index].value[4].data) +
          Number(response[index].value[5].data)
        } disabled></td>
                        `;
      }
    })
    .catch((err) => {
      console.log("ERROR LIST");
      console.log(err);
    });
}

function data() {
  let row = tableData.childElementCount - 1;
  let data = [];
  if (row != 0) {
    for (let index = 0; index < row; index++) {
      let row = document.querySelectorAll(`#i_${index}`);
      let value = [];

      row.forEach((r, i) => {
        let valueData = {
          data: r.value,
          col: i,
          area: "A0006",
        };
        value.push(valueData);
      });

      let dataObject = {
        row: index,
        value: value,
      };
      data.push(dataObject);
    }
  }
  Object.assign(raiz, { data: data });
  return raiz;
}

function update() {
  let body = data();
  console.log("body => ", body)
  axios({
    method: "PUT",
    url: `http://localhost:3003/data/61f321a750d858840829f7fa`,
    data: body,
  })
    .then((res) => {
      console.log("CONSUMIR ENPOINT UPDATE => ",res);
    })
    .catch((err) => {
      console.log("ERROR");
      console.log(err);
    });
}

window.addEventListener("load", () => {
  console.log("LIST AL REFRESCAR", list());
});

btn.addEventListener("click", () => {
  let count = tableData.childElementCount - 1;
  tableData.innerHTML += `
                              <tr>
                                <td><input id="i_${count}" type="number"></td>
                                <td><input id="i_${count}" type="number"></td>
                                <td><input id="i_${count}" type="number"></td>
                                <td><input id="i_${count}" type="number"></td>
                                <td><input id="i_${count}" type="number"></td>
                                <td><input id="i_${count}" type="number"></td>
                                <td><input id="i_${count}" type="number" disabled></td>
                              </tr>
                         `;
  
});

btnStart.addEventListener("click", () => {
  let row = tableData.childElementCount - 1;
  if (row != 0) {
    //OBTENER DATOS
    for (let index = 0; index < row; index++) {
      let listRow = document.querySelectorAll(`#i_${index}`);
      listRow.forEach((input) => {
        input.addEventListener("keyup", () => {
          console.log("UPDATE => ",update());
          let cellChange = document.querySelectorAll(`#i_${index}`);
          let dataRow = {
            position: cellChange[0].id,
            zero: cellChange[0].value,
            one: cellChange[1].value,
            two: cellChange[2].value,
            three: cellChange[3].value,
            four: cellChange[4].value,
            five: cellChange[5].value,
            six: cellChange[6].value,
          };
          socket.emit("chat:everybody", dataRow);
        });
      });
    }

    socket.on("chat:everybody", (data) => {
      let cellSelect = document.querySelectorAll(`#${data.position}`);
      cellSelect[0].value = data.zero;
      cellSelect[1].value = data.one;
      cellSelect[2].value = data.two;
      cellSelect[3].value = data.three;
      cellSelect[4].value = data.four;
      cellSelect[5].value = data.five;
      cellSelect[6].value = Number(data.four) + Number(data.five);
    });
  }
});

// setInterval(() => {
// console.log("listar")
// list()
// }, 1000);
