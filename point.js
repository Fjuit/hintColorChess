class Point {

  static changeHintColor(classNamePiece) {
    Array.from(document.getElementsByClassName(classNamePiece)).forEach(
      function (piece) {
        piece.addEventListener("mousedown", function () {
          Point.changeBGColor();
        });
      }
    );
  }

  static changeBGColor() {
    browser.storage.local.get("color").then((data) => {
      if (data.color != undefined) {
        var cols = document.getElementsByClassName("hint");
        for (let i = 0; i < cols.length; i++) {
          cols[i].style.backgroundColor = data.color;
        }
        var captureHint = document.getElementsByClassName("capture-hint");
        for (let i = 0; i < captureHint.length; i++) {
          captureHint[i].style.borderColor = data.color;
        }
      }
    });
  }

  static changeBGColor1(tab) {
    browser.scripting.executeScript({
      target: { tabId: tab.id },
      function: ()=>{Point.changeBGColor();},
    });
}
}