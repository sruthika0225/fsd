document.getElementById("leaveForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const res = await fetch("/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      employeeId: document.getElementById("empId").value,
      type: document.getElementById("type").value,
      days: document.getElementById("days").value,
    }),
  });

  const data = await res.json();
  document.getElementById("message").innerText = data.message;
});

async function checkBalance() {
  const id = document.getElementById("checkId").value;

  const res = await fetch("/balance/" + id);
  const data = await res.json();

  document.getElementById("result").innerText =
    `Casual Leave: ${data.Casual} days | Medical Leave: ${data.Medical} days`;
}
