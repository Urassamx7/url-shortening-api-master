console.log("Hi, Dev!");
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
  shortedLinkDiv.appendChild(a);
  li.appendChild(originalLinkDiv);
  li.appendChild(shortedLinkDiv);
  return li;
}
function SaveLinkToLocalStorage(originallink, shortenedLink) {
  let links = JSON.parse(localStorage.getItem("links")) || [];
  links.push({
    originallink,
    shortenedLink,
  });
  localStorage.setItem("links", JSON.stringify(links));
}

function getLinksFromLocalStorage() {
  let links = JSON.parse(localStorage.getItem("links")) || [];
  var ulist = document.querySelector(".ulink");
  links.forEach((link) => {
    var li = createListItem(link.originalLinkElem, link.shortedLinkElem); //Elemento que vai conter os elementos do link original e o encurtado
    ulist.appendChild(li);
  });
}

document.body.addEventListener("DOMContentLoad", getLinksFromLocalStorage());
