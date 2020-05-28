let lis = document.getElementById("container").children;

let allStandard = [];

for (let li of lis) {
  console.log("li", li.getAttribute("data-tag"));
  if (li.getAttribute("data-tag").match(/css/)) {
    allStandard.push({
      name: li.children[1].innerText,
      url: li.children[1].children[0].href,
    });
  }
}
console.log("all", allStandard);
