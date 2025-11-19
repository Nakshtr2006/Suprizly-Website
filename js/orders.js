document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const totalItems = document.getElementById("total-items");
  const totalPrice = document.getElementById("total-price");

  function updateTotals() {
    let itemCount = 0;
    let priceSum = 0;

    cards.forEach(card => {
      const price = parseFloat(card.dataset.price);
      const qty = parseInt(card.querySelector("input").value) || 0;
      itemCount += qty;
      priceSum += qty * price;
    });

    totalItems.textContent = itemCount;
    totalPrice.textContent = priceSum.toFixed(2);
  }



  // Save button
  document.querySelectorAll(".save").forEach(btn => {
    btn.addEventListener("click", updateTotals);
  });

  // Delete button
  document.querySelectorAll(".delete").forEach(btn => {
    btn.addEventListener("click", e => {
      const card = e.target.closest(".card");
      card.querySelector("input").value = "";
      updateTotals();
    });
  });

  // Close button - hide/remove card
  document.querySelectorAll(".close-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const card = e.target.closest(".card");
      card.style.transition = "all 0.3s ease";
      card.style.opacity = "0";
      card.style.transform = "scale(0.8)";
      setTimeout(() => {
        card.style.display = "none";
        updateTotals();
      }, 300);
    });
  });
});

class Subscription {
  constructor(buttonId, inputId, messageId) {
    this.button = document.getElementById(buttonId);
    this.input = document.getElementById(inputId);
    this.message = document.getElementById(messageId);

    this.init();
  }

  init() {
    if (this.button) {
      this.button.addEventListener("click", () => this.handleSubscribe());
    } else {
      console.error("Subscribe button not found!");
    }
  }

  handleSubscribe() {
    const email = this.input.value.trim();

    if (email === "") {
      this.showMessage("Please enter your email before subscribing!", "error");
      return;
    }

    if (!this.validateEmail(email)) {
      this.showMessage("Please enter a valid email address!", "error");
      return;
    }

    this.showMessage(
      `🎉 Thanks for subscribing, ${email}! You’re now part of the Surprise Club!`,
      "success"
    );
    this.input.value = "";
  }

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  showMessage(text, type) {
    this.message.textContent = text;
    this.message.style.color = type === "success" ? "green" : "red";
  }
}

// Run when page loads
document.addEventListener("DOMContentLoaded", () => {
  new Subscription("subscribeBtn", "emailInput", "messageArea");
});

