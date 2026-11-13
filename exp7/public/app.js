function register() {
  fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: regUser.value,
      password: regPass.value,
    }),
  })
    .then((res) => res.text())
    .then((msg) => (message.innerText = msg));
}

function login() {
  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: loginUser.value,
      password: loginPass.value,
    }),
  }).then(async (res) => {
    const msg = await res.text();

    if (res.ok) {
      auth.style.display = "none";
      shop.style.display = "block";
      loadProducts();
    }

    message.innerText = msg;
  });
}

function loadProducts() {
  fetch("/products")
    .then((res) => res.json())
    .then((data) => {
      products.innerHTML = "";

      data.forEach((p) => {
        products.innerHTML += `
          <p>${p.name} - ₹${p.price}
          <button onclick="addToCart(${p.id})">
            Add to Cart
          </button></p>`;
      });
    });
}

function addToCart(id) {
  fetch("/add-to-cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  }).then((res) => {
    if (res.ok) {
      message.innerText = "Added to cart!";
    } else {
      message.innerText = "Please login again";
    }
  });
}

function loadCart() {
  fetch("/cart")
    .then((res) => res.json())
    .then((data) => {
      cart.innerHTML = "";

      let total = 0;

      data.forEach((p) => {
        cart.innerHTML += `<p>${p.name} - ₹${p.price}</p>`;
        total += p.price;
      });

      cart.innerHTML += `<h3>Total: ₹${total}</h3>`;
    });
}

function logout() {
  fetch("/logout").then(() => location.reload());
}
