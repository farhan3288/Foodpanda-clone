const firebaseConfig = {
    apiKey: "AIzaSyDrJG6aS-nu3b2bymx99xz9VYMvTpz4mDM",
    authDomain: "foodpanda-409da.firebaseapp.com",
    projectId: "foodpanda-409da",
    storageBucket: "foodpanda-409da.firebasestorage.app",
    messagingSenderId: "977198855727",
    appId: "1:977198855727:web:ff67fcfa48cd8b6252b8da",
    measurementId: "G-23T081FV8B"
  };
  
  firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("auth").style.display = "none";
      document.getElementById("dashboard").style.display = "block";
    })
    .catch(error => {
      document.getElementById("auth-message").innerText = error.message;
    });
}

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("auth-message").innerText = "Account created. Please login.";
    })
    .catch(error => {
      document.getElementById("auth-message").innerText = error.message;
    });
}

function logout() {
  auth.signOut();
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("auth").style.display = "block";
}

auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("auth").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadMenu();
  }
});

let menuItems = [
  { name: "Burger", price: 200, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOX2YyS0W1LnrD5eyd-7Q9kvO1JGvE80AXXA&s" },
  { name: "Pizza", price: 500, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrgh6Xx8CBnZM8NPOmIEOwqV_KK6PnE1pluA&s" },
  { name: "Biryani", price: 300, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjrzxb50qx_ti-Lh5fJ8DHfELFrDrMK6NG1w&s" }
];

function loadMenu() {
  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "";
  menuItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.innerHTML = `<img src="${item.image}" alt="${item.name}"><strong>${item.name}</strong><br>Rs ${item.price}<br><button onclick='addToCart("${item.name}")'>Add to Cart</button>`;
    menuDiv.appendChild(div);
  });
}

function addMenuItem() {
  const name = document.getElementById("item-name").value;
  const price = parseInt(document.getElementById("item-price").value);
  const image = document.getElementById("item-image").value;
  if (name && price && image) {
    menuItems.push({ name, price, image });
    loadMenu();
  }
}

const cart = [];

function addToCart(item) {
  cart.push(item);
  const cartList = document.getElementById("cart");
  const li = document.createElement("li");
  li.innerText = item;
  cartList.appendChild(li);
}
