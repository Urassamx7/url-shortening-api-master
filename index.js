console.log("Hi, Dev!");
const btn = document.createElement("button");
document.getElementById("short").addEventListener("click", () => {
  const inputForm = document.getElementById("input");
  const link = inputForm.value.trim();
  const msgerror = "Introduza um link";
  const apiUrl = "https://shrtlnk.dev/api/v2/link"; // Link do encurtador

  function getLink(link) {
    //Validação do campo!!
    if (link === "") {
      errorFunc(inputForm, msgerror);
    } else {
      sucFunc(inputForm);
      shortLink(link).then((data) => {
        if (data) {
          console.log(data);
          var ulist = document.querySelector(".ulink");
          if (ulist) {
            const li = createListItem(link, data);
            ulist.appendChild(li);
            SaveLinkToLocalStorage(link, data);
          }
        }
      });

      console.log(link);
    }
  }
  async function shortLink(link) {
    const headers = {
      "api-key": "EF9GgPn3wQi97dAGh6PUWx4yY5dxUJq1fuqTzb8emLinO",
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      url: link,
    });

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: body,
      });
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data.shrtlnk;
    } catch (e) {
      console.log(e.message);
      return null;
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

function createListItem(originalLink, shortenedLink) {
  var li = document.createElement("li"); //Elemento que vai conter os elementos do link original e o encurtado
  li.className = "link-list";
  const originalLinkDiv = document.createElement("div"); //Vai conter o elemento original
  originalLinkDiv.className = "toShort";
  originalLinkDiv.textContent = originalLink;
  const shortedLinkDiv = document.createElement("div"); //Vai conter o elemento encurtado
  shortedLinkDiv.className = "shorted-link";
  const a = document.createElement("a");
  a.href = shortenedLink;
  a.textContent = shortenedLink;
  btn.textContent = "Copy";
  //fazer hover no btn
  btn.addEventListener("mouseover", () => {
    btn.style = "background-color: #3A3053; transition:.3s ease-in-out;";
  });
  btn.addEventListener("mouseout", () => {
    btn.style = "background-color: #2BD0D2; transition:.3s ease-in-out;";
  });
  //fazer click no btn
  btn.addEventListener("click", () => {
    copyLink(shortenedLink);
  });
  shortedLinkDiv.appendChild(a);
  shortedLinkDiv.appendChild(btn);
  li.appendChild(originalLinkDiv);
  li.appendChild(shortedLinkDiv);
  return li;
}
function SaveLinkToLocalStorage(originallink, shortenedlink) {
  let links = JSON.parse(localStorage.getItem("links")) || [];
  links.push({
    originallink,
    shortenedlink,
  });
  localStorage.setItem("links", JSON.stringify(links));
}

function getLinksFromLocalStorage() {
  let links = JSON.parse(localStorage.getItem("links")) || [];
  var ulist = document.querySelector(".ulink");
  links.forEach((link) => {
    var li = createListItem(link.originallink, link.shortenedlink); //Elemento que vai conter os elementos do link original e o encurtado
    ulist.appendChild(li);
  });
}

function copyLink(Textlink) {
  if (navigator.clipboard.writeText(Textlink)) {
    btn.innerText = "Copied!";
    btn.disabled = true;
    btn.style = "background-color: #3A3053; transition: .3s ease-in-out;";
  }
}

document.querySelector("#menuHamb").addEventListener("click", () => {
  var overlay = document.querySelector(".overlay");
  overlay.style = "display:flex";

  const menuView = document.createElement("div");
  menuView.className = "mobile-menu-view";

  const features = document.createElement("a");
  features.href = "#";
  features.textContent = "Features";
  const pricing = document.createElement("a");
  pricing.href = "#";
  pricing.textContent = "Pricing";
  const res = document.createElement("a");
  res.href = "#";
  res.textContent = "Resources";
  const log = document.createElement("a");
  log.href = "#";
  log.textContent = "Login";
  const sign = document.createElement("a");
  sign.href = "#";
  sign.textContent = "Sign Up";
  menuView.appendChild(features);
  menuView.appendChild(res);
  menuView.appendChild(pricing);
  menuView.appendChild(log);
  menuView.appendChild(sign);
  overlay.appendChild(menuView);
  document.body.classList.add("noflow")
  overlay.addEventListener("click", () => {
    overlay.style = "display:none";
    menuView.style = "display:none";
    document.body.classList.remove("noflow")
  });
});

document.addEventListener("DOMContentLoad", getLinksFromLocalStorage());
