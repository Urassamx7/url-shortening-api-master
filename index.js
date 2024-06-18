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
        console.log(data);
        var ulist = document.getElementsByTagName("ul");
        var li = document.createElement("li"); //Elemento que vai conter os elementos do link original e o encurtado
        li.className = "link-list";
        const originalLink = document.createElement("div"); //Vai conter o elemento original
        originalLink.className = "toShort";
        originalLink.textContent = link;
        const shortedLink = document.createElement("div"); //Vai conter o elemento encurtado
        shortedLink.className = "shorted-link";
        const a = document.createElement("a");
        a.href = data;
        a.textContent = data;
        shortedLink.appendChild(a);
        const btn = document.createElement("button");
        btn.textContent = "Copy";
        li.appendChild(originalLink);
        li.appendChild(shortedLink);
        shortedLink.appendChild(btn);
        ulist[0].appendChild(li);
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

function SaveLinkToLocalStorage(link) {
  const links = JSON.parse(localStorage.getItem("links")) || [];
  links.push(link);
  localStorage.setItem("links", JSON.stringify(links));
}
