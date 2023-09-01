const products = [
  {
    id: "1",
    title: "جعبه چوبی طرح 1",
    price: 200000,
    image: "img-1.jpg",
  },
  {
    id: "2",
    title: "جعبه چوبی طرح 2",
    price: 300000,
    image: "img-2.jpg",
  },

  {
    id: "3",
    title: "جعبه چوبی طرح 3",
    price: 250000,
    image: "img-3.jpg",
  },
  {
    id: "4",
    title: "جعبه چوبی طرح 4",
    price: 400000,
    image: "img-4.jpg",
  },
  {
    id: "5",
    title: "جعبه چوبی طرح 5",
    price: 350000,
    image: "img-5.jpg",
  },
  {
    id: "6",
    title: "جعبه چوبی طرح 6",
    price: 500000,
    image: "img-6.jpg",
  },
];

let total = 0;
let totalWithTax = 0;
const cartTotal = document.querySelector(".cart-total");
const cartTotalInfo = document.createElement("span");
cartTotalInfo.textContent = "جمع کل :" + " " + total;
cartTotal.appendChild(cartTotalInfo);

const cartTotalPay = document.createElement("span");
cartTotalPay.textContent = "قابل پرداخت :" + " " + totalWithTax;
cartTotal.appendChild(cartTotalPay);

for (const product of products) {
  const productList = document.querySelector(".product-list");
  const productItem = document.createElement("li");
  productItem.classList.add("product-item");
  productList.appendChild(productItem);

  const productImage = document.createElement("img");
  productItem.appendChild(productImage);
  productImage.setAttribute("src", `images/${product.image}`);

  const productTitle = document.createElement("span");
  productTitle.textContent = product.title;
  productTitle.classList.add("product-title");
  productItem.appendChild(productTitle);

  const commas = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const productPrice = document.createElement("span");
  productPrice.textContent = commas + " " + "تومان";
  productPrice.classList.add("product-price");
  productItem.appendChild(productPrice);

  const productButton = document.createElement("button");
  productButton.textContent = "افزودن به سبد خرید";
  productButton.classList.add("product-btn");
  productItem.appendChild(productButton);
  const buttonIcon = document.createElement("i");
  buttonIcon.classList.add("fa", "fa-shopping-cart");
  productButton.appendChild(buttonIcon);

  const cartList = document.querySelector(".cart-list");
  cartList.textContent = "سبد خرید شما خالی است.";

  productButton.onclick = () => {
    cartList.firstChild.textContent = "";
    cartList.classList.remove("empty-cart");

    let itemCount = 1;

    const cartItem = document.createElement("li");
    cartItem.classList.add("cart-item");
    cartItem.setAttribute("id", product.id);
    cartItem.textContent =
      product.title +
      " - " +
      commas +
      " " +
      "تومان" +
      " " +
      `(${itemCount} عدد)`;

    if (cartList.children.length === 0) {
      cartList.appendChild(cartItem);
    } else {
      for (item of cartList.children) {
        if (item.id === product.id) {
          cartItem.textContent =
            product.title +
            " - " +
            commas +
            " " +
            "تومان" +
            " " +
            `(${itemCount + 1} عدد)`;
          console.log("duplicate");
        } else {
          cartList.appendChild(cartItem);
          console.log("new");
        }
      }
    }

    const cartImage = document.createElement("img");
    cartImage.setAttribute("src", `images/${product.image}`);
    cartItem.appendChild(cartImage);

    const cartIcon = document.createElement("i");
    cartIcon.classList.add("fa", "fa-trash");
    cartItem.appendChild(cartIcon);

    total += product.price;
    let totalCommas = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    cartTotalInfo.textContent = "جمع کل :" + " " + totalCommas;

    totalWithTax = total + total * 0.09;
    let totalTaxCommas = totalWithTax
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    cartTotalPay.textContent = "قابل پرداخت :" + " " + totalTaxCommas;

    cartIcon.onclick = () => {
      cartIcon.parentElement.remove();
      total -= product.price;
      totalCommas = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      cartTotalInfo.textContent = "جمع کل :" + " " + totalCommas;

      totalWithTax = total + total * 0.09;
      totalTaxCommas = totalWithTax
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      cartTotalPay.textContent = "قابل پرداخت :" + " " + totalTaxCommas;
      if (total === 0) {
        cartList.textContent = "سبد خرید شما خالی است.";
        cartList.classList.add("empty-cart");
      }
    };
  };
}
