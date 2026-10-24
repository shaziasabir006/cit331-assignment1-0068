
const form = document.querySelector("#registration-form");
const list = document.querySelector("#registration-list");
const clearButton = document.querySelector("#clear-all");
const confirmation = document.querySelector("#confirmation");

const storageKey = "nexoraRegistrations";

// Run registration code only on the registration page
if (form && list && clearButton && confirmation) {

  function getRegistrations() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "[]");
    } catch (error) {
      console.error("Could not read registrations:", error);
      return [];
    }
  }

  function showRegistrations() {
    list.replaceChildren();

    const registrations = getRegistrations();

    // Show a message when no registrations exist
    if (registrations.length === 0) {
      const item = document.createElement("li");
      item.textContent = "No registrations yet.";
      list.appendChild(item);
      return;
    }

    // Display saved registrations
    registrations.forEach(function (student) {
      const item = document.createElement("li");
      item.textContent = `${student.name} — ${student.event}`;
      list.appendChild(item);
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const data = new FormData(form);

    const student = {
      name: data.get("fullName"),
      email: data.get("email"),
      phone: data.get("phone"),
      event: data.get("event"),
      source: data.get("source")
    };

    const registrations = getRegistrations();
    registrations.push(student);

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(registrations)
      );

      confirmation.textContent =
        "Registration saved successfully!";

      form.reset();
      showRegistrations();

    } catch (error) {
      confirmation.textContent =
        "Unable to save registration. Please try again.";
      console.error(error);
    }
  });

  clearButton.addEventListener("click", function () {
  const confirmed = window.confirm(
    "Are you sure you want to delete all saved registrations?"
  );

  if (!confirmed) {
    return;
  }

  localStorage.removeItem(storageKey);

  confirmation.textContent =
    "All registrations cleared.";

  showRegistrations();
});
  showRegistrations();
}
