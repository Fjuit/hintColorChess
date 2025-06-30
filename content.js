
function handlePiece(someDiv) {
  const div = document.createElement("div");
  div.className = "picker";
  const picker = document.createElement("input");
  const title = document.createElement("h4");
  title.style.color = "white";
  title.textContent = "Hint color";
  picker.type = "color";
  picker.id = "color-picker";

  div.appendChild(title);
  div.appendChild(picker);

  const playerBottom = document.getElementById("board-layout-player-bottom");
  if(playerBottom!=null){
    playerBottom.after(div);
  }

  browser.storage.local.get("color").then((data) => {
    if (data.color != undefined) {
       picker.value = data.color;
    }
  });

  Point.changeHintColor("piece")
  

  picker.onchange = function () {
    browser.storage.local.set({ color: picker.value });
    Point.changeHintColor("piece");
}
}


const observer = new MutationObserver(function (mutations, mutationInstance) {
  const someDiv = document.getElementsByClassName("piece");
  if (someDiv.length != 0) {
    handlePiece(someDiv);
    mutationInstance.disconnect();
  }
});
observer.observe(document, {
  childList: true,
  subtree: true,
});

