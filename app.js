// Select All stuff
const sendBtn = document.getElementById("send");
const sendMessage = document.getElementById("input");

const blockBtn = document.getElementById("blockBtn");
const blockInput = document.getElementById("blockInput");

const notice = document.getElementById("notice");
const blockNotice = document.getElementById("blockNotice");
let inputMessage = [];
let blockMessage = [];
function SetMessageToLocalStorage(message) {
  localStorage.setItem("message", JSON.stringify(message));
}
function GetMessageToLocalStorage() {
  const arrayString = localStorage.getItem("message");

  if (arrayString) {
    return JSON.parse(arrayString);
  } else {
    return [];
  }
}

// Block message funtion
function SetBlockMessageToLocalStorage(message) {
  localStorage.setItem("block", JSON.stringify(message));
}
function GetBlockMessageToLocalStorage() {
  const arrayString = localStorage.getItem("block");

  if (arrayString) {
    return JSON.parse(arrayString);
  } else {
    return [];
  }
}

function detectBlockMsg(array) {
  if (array.length !== 0) {
    let blockMsg = sendMessage.value.split(" ");
    for (let index = 0; index < blockMsg.length; index++) {
      // console.log(sendMessage.value.toLowerCase())
      if (array.includes(blockMsg[index].toLowerCase())) {
        notice.innerText = "Block this unusual activity";
        setInterval(() => {
          notice.innerText = "";
        }, 4000);

        return false;
      }
    }
    return true;
  } else {
    return true;
  }
}

// ==================================

if (GetMessageToLocalStorage().length !== 0) {
  notice.innerText = "";
}
sendBtn.addEventListener("click", function () {
  if (sendMessage.value !== "") {
    let blockList = GetBlockMessageToLocalStorage();

    if (detectBlockMsg(blockList) === true) {
      inputMessage = GetMessageToLocalStorage();
      inputMessage.push(sendMessage.value);
      SetMessageToLocalStorage(inputMessage);
      const ul = document.getElementById("chatBox");
      const li = document.createElement("li");
      li.className = "chat chat-end";
      const p = document.createElement("p");
      p.className = "chat-bubble";
      p.textContent = sendMessage.value;
      li.appendChild(p);
      ul.appendChild(li);
      sendMessage.value = "";
      notice.innerText = "";
    }
  } else {
    notice.innerText = "Empty message not send...";
  }
});
let datas = GetMessageToLocalStorage();
for (let data of datas) {
  const ul = document.getElementById("chatBox");
  const li = document.createElement("li");
  li.className = "chat chat-end";
  const p = document.createElement("p");
  p.className = "chat-bubble";
  p.textContent = data;
  li.appendChild(p);

  ul.appendChild(li);
}

// Block section ===========================

blockBtn.addEventListener("click", function () {
  if (blockInput.value !== "") {
    blockMessage = GetBlockMessageToLocalStorage();
    blockMessage.push(blockInput.value.toLowerCase());
    SetBlockMessageToLocalStorage(blockMessage);
    const ul = document.getElementById("block-list");
    const li = document.createElement("li");
    li.className =
      "hover:bg-red-800 p-2 my-1 text-center cursor-pointer bg-red-400 text-white";

    li.textContent = blockInput.value;

    ul.appendChild(li);

    blockNotice.innerText = "";
    blockInput.value = "";
    setInterval(() => {
      blockNotice.innerText = "";
    }, 3000);
  } else {
    blockNotice.innerText = "Empty message not add";
  }
});
let blockData = GetBlockMessageToLocalStorage();
for (let data of blockData) {
  const ul = document.getElementById("block-list");
  const li = document.createElement("li");

  li.className =
    "hover:bg-gray-200 p-2 rounded-full my-1 text-center cursor-pointer bg-white";
  li.textContent = data;

  ul.appendChild(li);
}
