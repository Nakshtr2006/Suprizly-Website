// Class representing a Mystery Box
class MysteryBox {
  constructor(name, price, discount, desc, features) {
    this.name = name;
    this.price = price;
    this.discount = discount;
    this.desc = desc;
    this.features = features;
  }

  renderCard() {
    const div = document.createElement("div");
    div.className = "box1";
    div.innerHTML = `
      <h5>${this.discount}</h5>
      <h3>${this.name}</h3>
      <p>${this.desc}</p>
      <h3>${this.price}</h3>
      <button class="details-btn">View Details</button>
    `;
    div.querySelector(".details-btn").addEventListener("click", () => this.showDetails());
    return div;
  }

  showDetails() {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <h2>${this.name}</h2>
        <p><strong>Price:</strong> ${this.price}</p>
        <p><strong>Discount:</strong> ${this.discount}</p>
        <p>${this.desc}</p>
        <ul>${this.features.map(f => `<li>${f}</li>`).join("")}</ul>
      </div>
    `;
    document.body.appendChild(modal);

    // Close functionality
    modal.querySelector(".close-btn").onclick = () => modal.remove();
    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };
  }
}

// Fetch and display all boxes
fetch("\\jason\\boxesData.json")
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector(".boxes");
    container.innerHTML = ""; // clear default
    data.forEach(b => {
      const box = new MysteryBox(b.name, b.price, b.discount, b.desc, b.features);
      container.appendChild(box.renderCard());
    });
  })
  .catch(err => console.error("Error loading boxes:", err));


// Subscribe Button Functionality
document.getElementById("subscribeBtn").addEventListener("click", function () {
  const email = document.getElementById("emailInput").value.trim();
  const msg = document.getElementById("messageArea");

  if (email === "") {
    msg.textContent = "Please enter an email address.";
    msg.style.color = "red";
  } else if (!email.includes("@")) {
    msg.textContent = "Invalid email. Please enter a valid one.";
    msg.style.color = "red";
  } else {
    msg.textContent = `🎉 You're now part of the Surprise Club, ${email}!`;
    msg.style.color = "green";
  }
});
