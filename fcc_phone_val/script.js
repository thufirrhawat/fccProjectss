document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM loaded");

  const userInput = document.getElementById("user-input");
  const results = document.getElementById("results-div");
  const checkButton = document.getElementById("check-btn");
  const clearButton = document.getElementById("clear-btn");

  const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/;

  const validatePhoneNumber = (phoneNumber) => {
    return phoneRegex.test(phoneNumber);
  };

  checkButton.addEventListener("click", () => {
    const input = userInput.value.trim();
    if (input === "") {
      alert("Please provide a phone number");
    } else if (validatePhoneNumber(input)) {
      results.textContent = `Valid US number: ${input}`;
      results.style.color = "green";
    } else {
      results.textContent = `Invalid US number: ${input}`;
      results.style.color = "red";
    }
  });

  clearButton.addEventListener("click", () => {
    userInput.value = "";
    results.textContent = "";
  });
});
