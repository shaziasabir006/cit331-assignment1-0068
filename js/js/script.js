const form = document.querySelector("#registration-form");
const list = document.querySelector("#registration-list");
const clearButton = document.querySelector("#clear-all");
const confirmation = document.querySelector("#confirmation");
const storageKey = "nexoraRegistrations";
function getRegistrations() {
  return JSON.parse(localStorage.getItem(storageKey) || "[]");
}
function showRegistrations() {
  list.replaceChildren();

  getRegistrations().forEach(function (student) {
    const item = document.createElement("li");
    item.textContent = `${student.name} — ${student.event}`;
    list.appendChild(item);
  });
}
form.addEventListener("submit", function (event) {
  event.preventDefault();

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

  localStorage.setItem(storageKey, JSON.stringify(registrations));

  confirmation.textContent = "Registration saved successfully!";
  form.reset();
  showRegistrations();
});
clearButton.addEventListener("click", function () {
  localStorage.removeItem(storageKey);
  confirmation.textContent = "All registrations cleared.";
  showRegistrations();
});

showRegistrations();