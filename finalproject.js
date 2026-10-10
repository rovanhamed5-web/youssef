let father = document.getElementById("container");
function addTask() {
  let child1 = document.getElementById("inputTask");
  let task = child1.value;
  if (task == "") {
    alert("enter your task");
  } else {
    let child2 = document.createElement("div");
    father.appendChild(child2);
    child2.style.backgroundColor = "#eeeeee";
    child2.style.width = "300px";
    child2.style.padding = "10px";
    child2.style.margin = "5px";
    child2.style.borderRadius = "10px";
    child2.style.margin = "20px auto";
    child2.style.textAlign = "center";
    let tasktag = document.createElement("h3");
    child2.appendChild(tasktag);
    tasktag.innerHTML = task;
    console.log(task);

    let delbtn = document.createElement("button");
    child2.appendChild(delbtn);
    console.log(delbtn)
    delbtn.innerHTML = "delete";
    console.log(delbtn)
    delbtn.onclick = deltask;
    function deltask() {
      this.parentElement.remove();
    }
    let editbtn = document.createElement("button");
    child2.appendChild(editbtn);
    editbtn.innerHTML = "edit";
    editbtn.onclick = edittask;
    function edittask() {
      let oldtask = this.parentElement.querySelector("h3");
      let newtask = prompt("enter your game");

      if (task != "") {
        oldtask.innerHTML = newtask;
      } else {
        alert("enter your game");
      }
    }
  }
}
function searchGame() {

    let search = document.getElementById("gameSearch").value
        .toLowerCase()
        .trim();

    if (search === "fc 26") {
        openFC26();

    } else if (search === "spider-man 2" || search === "spiderman 2") {
        openSpiderMan();

    } else if (search === "gang beasts") {
        openGangBeasts();

    } else if (search === "god of war") {
        openGodOfWar();

    } else if (search === "gta" || search === "gta 5") {
        openGTA();

    } else if (search === "cuphead") {
        openCuphead();

    } else if (search === "minecraft") {
        openMinecraft();

    } else {
        alert("Game not found");
    }
}
let fc26Quantity = 1;

function increaseQuantity() {
    fc26Quantity++;
    document.getElementById("fc26Quantity").textContent = fc26Quantity;
}

function decreaseQuantity() {
    if (fc26Quantity > 1) {
        fc26Quantity--;
        document.getElementById("fc26Quantity").textContent = fc26Quantity;
    }
}

function deleteFC26() {
    document.getElementById("fc26Modal").style.display = "none";

    fc26Quantity = 1;
    document.getElementById("fc26Quantity").textContent = fc26Quantity;
}
// img.onclick = function () {
//     document.getElementById("main").style.display = "block";
// };
// document.getElementById("close").onclick = function () {
//     document.getElementById("main").style.display = "none";
// };