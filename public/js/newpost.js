const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const postContent = document.querySelector("#post-content").value.trim();
  const system = document.querySelector("#post-system").value.trim();

  if (title && postContent && system) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, system, postContent}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create post");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete post");
    }
  }
};

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".post-list")
  .addEventListener("click", delButtonHandler);
