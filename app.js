let food = [
  {
    name: "Street Tacos",
    price: 5,
    img: "https://www.ericajulson.com/wp-content/uploads/2017/08/Carnitas-Street-Tacos-3.jpg",
    id: "8t0hwfrq89r08oq3ni",
    category: "food",
    taxable: true
  },
  {
    name: "Street Burrito",
    price: 12,
    img: "https://avocadosfrommexico.com/wp-content/uploads/2017/01/Pic-503-Breakfast-Burrito-a-la-Mexicana-Final-low.jpg",
    id: "rvq7rv39quifqbiodwHNI",
    category: "food",
    taxable: false
  },
  {
    name: "Taco Bowl",
    img: "https://www.macheesmo.com/wp-content/uploads/2012/07/Homemade-Taco-Bowl.jpg",
    id: "bgfvrgh8943rbiorhnip",
    category: "food",
    taxable: false
  },
  {
    name: "Hotsauce",
    img: "https://placehold.it/200x200",
    id: "fheuibhfioqwnfe",
    category: "condiment",
    price: 2,
    taxable: false
  }
]

let cart = JSON.parse(localStorage.getItem("cartData")) || []

let foodArea = document.getElementById("items")
let costArea = document.getElementById("total-cost")

function drawFood() {
  let template = ""
  food.forEach(f => template += `<div class="card col-3">
        <img class="card-img-top" src="${f.img}" alt="">
        <div class="card-body">
          <h4 class="card-title">${f.name}</h4>
          <p class="card-text">${f.price || "Free!"}</p>
          <button class="btn btn-primary" onclick="orderItem('${f.id}')">Order Item</button>
        </div>
      </div>`
  )
  foodArea.innerHTML = template
}

function drawTotal() {
  let total = 0
  let template = ""
  cart.forEach(item => {
    if (item.category == "food" && item.taxable == true) {
      total += (item.price * 1.07)
      template += item.name + "\n"
    } else {
      total += item.price || 0
      template += item.name + "\n"
    }
  })
  costArea.innerHTML = total.toString()
  document.getElementById("total-items").innerHTML = template
}




function orderItem(itemId) {
  let item = food.find(i => i.id == itemId)
  cart.push(item)
  console.log(cart)
  drawTotal()
  localStorage.setItem("cartData", JSON.stringify(cart))
}


function buyNow() {
  // cart.length = 0
  cart = []
  drawTotal()

  let elem = document.getElementById("message")
  elem.innerHTML = "Thank you for your purchase"

  setTimeout(() => {
    elem.innerHTML = ""
  }, 3000)

  localStorage.setItem("cartData", JSON.stringify(cart))

}


let color = "primary"
function toggleBgs() {
  let elems = document.querySelectorAll(`.bg-${color}`)
  for (let i = 0; i < elems.length; i++) {
    elems[i].classList.remove(`bg-${color}`)
    if (color == "primary") {
      color = "secondary"
    } else {
      color = "primary"
    }
    elems[i].classList.add(`bg-${color}`)
  }
}


function hotSauce() {
  let cards = document.querySelectorAll('.card')
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i]
    card.classList.add("fa-spin")
    // @ts-ignore
    document.getElementById("song").play()
    setTimeout(() => {
      card.classList.remove("fa-spin")
      // @ts-ignore
      document.getElementById("song").pause()

    }, 10000);
  }
}

setInterval(toggleBgs, 1200);

drawFood()
drawTotal()