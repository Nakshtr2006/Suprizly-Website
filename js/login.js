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

// Login Form Handler
class LoginForm {
  constructor() {
    this.form = document.querySelector('.login-form');
    this.signInBtn = document.querySelector('.signin');
    this.signUpBtn = document.querySelector('.signup');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSignIn(e));
      this.addRealTimeValidation();
    }
    
    if (this.signUpBtn) {
      this.signUpBtn.addEventListener('click', () => this.handleSignUp());
    }
  }

  addRealTimeValidation() {
    // First Name validation - only letters
    const firstName = this.form.querySelector('input[name="firstName"]');
    if (firstName) {
      firstName.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
      });
    }

    // Last Name validation - only letters
    const lastName = this.form.querySelector('input[name="lastName"]');
    if (lastName) {
      lastName.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
      });
    }

    // Phone number validation - only 10 digits
    const phone = this.form.querySelector('input[name="phone"]');
    if (phone) {
      phone.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
      });
    }

    // Pin Code validation - only numbers
    const pinCode = this.form.querySelector('input[name="pinCode"]');
    if (pinCode) {
      pinCode.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
      });
    }
  }

  validateForm() {
    const email = this.form.querySelector('input[name="email"]').value;
    const firstName = this.form.querySelector('input[name="firstName"]').value;
    const lastName = this.form.querySelector('input[name="lastName"]').value;
    const phone = this.form.querySelector('input[name="phone"]').value;
    const pinCode = this.form.querySelector('input[name="pinCode"]').value;

    // Email validation
    if (!this.validateEmail(email)) {
      alert('Please enter a valid email address!');
      return false;
    }

    // First Name validation
    if (!/^[A-Za-z\s]+$/.test(firstName)) {
      alert('First Name should only contain letters and spaces!');
      return false;
    }

    // Last Name validation
    if (!/^[A-Za-z\s]+$/.test(lastName)) {
      alert('Last Name should only contain letters and spaces!');
      return false;
    }

    // Phone validation
    if (!/^[0-9]{10}$/.test(phone)) {
      alert('Phone number must be exactly 10 digits!');
      return false;
    }

    // Pin Code validation
    if (!/^[0-9]{4,10}$/.test(pinCode)) {
      alert('Pin Code should only contain numbers (4-10 digits)!');
      return false;
    }

    return true;
  }

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  handleSignIn(e) {
    e.preventDefault();
    
    const email = this.form.querySelector('input[name="email"]').value;
    const firstName = this.form.querySelector('input[name="firstName"]').value;
    
    if (!email || !firstName) {
      alert('Please fill in all required fields!');
      return;
    }

    if (!this.validateForm()) {
      return;
    }
    
    // Simulate successful login
    alert(`Welcome back, ${firstName}! Login successful.`);
    console.log('Sign In Data:', {
      email,
      firstName
    });
    
    // Redirect to home page or dashboard
    window.location.href = '/';
  }

  handleSignUp() {
    const email = this.form.querySelector('input[name="email"]').value;
    const firstName = this.form.querySelector('input[name="firstName"]').value;
    const lastName = this.form.querySelector('input[name="lastName"]').value;
    const phone = this.form.querySelector('input[name="phone"]').value;
    const country = this.form.querySelector('input[name="country"]').value;
    const pinCode = this.form.querySelector('input[name="pinCode"]').value;
    const address = this.form.querySelector('textarea[name="address"]').value;
    
    if (!email || !firstName || !lastName || !phone) {
      alert('Please fill in all required fields!');
      return;
    }

    if (!this.validateForm()) {
      return;
    }
    
    // Simulate successful signup
    alert(`Account created successfully! Welcome, ${firstName}!`);
    console.log('Sign Up Data:', {
      email,
      firstName,
      lastName,
      phone,
      country,
      pinCode,
      address
    });
    
    // Redirect to home page
    window.location.href = '/';
  }
}

// Run when page loads
document.addEventListener("DOMContentLoaded", () => {
  new Subscription("subscribeBtn", "emailInput", "messageArea");
  new LoginForm();
});
