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
