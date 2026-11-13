function sendMessage() {
  let input = document.getElementById("input");
  let msg = input.value.trim();

  if (msg === "") return;

  let box = document.getElementById("messages");

  box.innerHTML += "<p>You: " + msg + "</p>";

  let reply = "";

  if (msg.toLowerCase().includes("hello")) reply = "Hi there!";
  else if (msg.toLowerCase().includes("bye")) reply = "Happy Learning!";
  else if (msg.toLowerCase().includes("how are you")) reply = "I am fine!";
  else reply = "You said: " + msg;

  box.innerHTML += "<p>Bot: " + reply + "</p>";

  input.value = "";
}
