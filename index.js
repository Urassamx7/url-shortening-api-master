console.log("Hi, Dev!");
document.getElementById("short").addEventListener("click", () => {
  const inputForm = document.getElementById("input");
  const link = inputForm.value.trim();
  const msgerror = "Introduza um link";
  const apiUrl = "https://api.cleanuir.com/v1/shorten"; // Link do encurtador

  function getLink(link) {
    //Validação do campo!!
    if (link === "") {
      errorFunc(inputForm, msgerror);
    } else {
      sucFunc(inputForm);
      shortLink(link).then((data) => {
        console.log(data);
        var ulist = document.getElementsByTagName("ul");
        var li = document.createElement("li");//Elemento que vai conter os elementos do link original e o encurtado
        li.className = "link-list";
        const originalLink = document.createElement("li");//Vai conter o elemento original
        originalLink.className = "toShort";
        const shortedLink = document.createElement("li");//Vai conter o elemento encurtado
        shortedLink.className = "shorted-link";
        li[0].appendChild(originalLink);
        li[0].appendChild(shortedLink);
        ulist[0].appendChild(li);
      });

      console.log(link);
    }
  }

  async function shortLink(link) {
    const headers = {
      "Content-Type": "aplication/json",
    };
    const body = JSON.stringify({
      url: link,
    });

    try {
      fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: body,
      });
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data = await response.json();
      return data.shortened_url;
    } catch (e) {
      console.log(e.message);
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

  getLink(link)
});
