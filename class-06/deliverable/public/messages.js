const messageForm = document.querySelector("#message-form");
const messageContainer = document.querySelector("#message-container");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("input[name=email]").value;
  const message = document.querySelector("input[name=message]").value;

  socket.emit("add-message", { email, message });
  messageForm.reset();
});

socket.on("new-message", (newMessage) => {
  const messageParagraph = buildMessage(newMessage);
  messageContainer.innerHTML += messageParagraph;
});

const buildMessage = ({ email, message, date }) => {
  return `
    <p class="mb-1">
      <span class="text-primary">${email}</span>
      <span class="text-danger">[${date}]</span>
      <span class="text-success">${message}</span>
    </p>
  `;
};
