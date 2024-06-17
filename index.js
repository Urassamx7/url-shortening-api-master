console.log("Hi, Dev!");
document.getElementById("short").addEventListener("click", () => {
  const inputForm = document.getElementById("input");
  const link = inputForm.value.trim();
  const msgerror = "Introduza um link";
  
  function getLink(link) {
    if (link === "") {
      errorFunc(inputForm, msgerror);
    } else {
      sucFunc(inputForm);
      var ulist = document.getElementsByTagName("ul");
      var li = document.createElement("li");
      li.innerHTML = link;
      ulist[0].appendChild(li);
      console.log(link);
    }
  }

  function errorFunc(req, message) {
    const divControl = req.parentElement;
    const p = divControl.querySelector("P");
    p.innerHTML = message;
    req.className = " error";
    p.className = "error-text";
  }
  function sucFunc(req) {
    const divControl = req.parentElement;
    const p = divControl.querySelector("P");
    p.innerHTML = "";
    req.className = "success";
  }

  getLink(link);
});
