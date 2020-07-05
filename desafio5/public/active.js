const currentPage = location.pathname
const menuItems = document.querySelectorAll("header a")

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active")
  }
}

const menuItems2 = document.querySelectorAll("header .links a")

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active")
  }
}

console.log(menuItems2)