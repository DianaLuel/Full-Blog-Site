const filterButtons = document.querySelectorAll(".filters button");
const blogCards = document.querySelectorAll(".blog-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    blogCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (filter === "All" || category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// === Blog Posts Data and Logic (for blog.html) ===
const posts = [
  {
    tag: "Destination",
    title: "Exploring the Wonders of Hiking",
    meta: "Theodore Reginad • 24 Jan 2024 • 10 min read",
    hero: "https://acaioutdoorwear.com/cdn/shop/articles/Capture_0644.jpg?v=1658311261",
    content: `
      <p>Hiking is more than a physical activity—it's a journey into nature's heart. This article explores the best hiking destinations and what makes them truly magical.</p>
      <h2>The Serenity of the Trails</h2>
      <p>From the red rocks of Utah to the misty trails of the Pacific Northwest, every trail offers a unique experience.</p>
      <h2>Gear Tips & Essentials</h2>
      <p>Don’t forget: water, sunscreen, boots, and a spirit for adventure!</p>
      <h2>Top Places to Hike in 2024</h2>
      <ul>
        <li>Wadi Rum, Jordan</li>
        <li>Torres del Paine, Chile</li>
        <li>Banff National Park, Canada</li>
        <li>Simien Mountains, Ethiopia</li>
      </ul>
    `,
  },
  {
    tag: "Culinary",
    title: "World Flavors: Culinary Adventures Abroad",
    meta: "Sophie Mitchell • 15 Feb 2024 • 8 min read",
    hero: "https://anbessa.travel/wp-content/uploads/2023/12/Ethiopian-cultural-food-beyaynet-1024x683.png",
    content: `
      <p>Food is the gateway to culture. This post explores the vibrant dishes you can experience while traveling.</p>
      <h2>Top Culinary Cities</h2>
      <ul>
        <li>Tokyo, Japan</li>
        <li>Istanbul, Turkey</li>
        <li>Lima, Peru</li>
        <li>Bangkok, Thailand</li>
      </ul>
      <h2>Tips for Foodies</h2>
      <p>Always try the street food. Visit local markets. Ask locals for their favorites. Be curious and respectful.</p>
    `,
  },
  {
    tag: "Tips & Hacks",
    title: "10 Travel Hacks You Wish You Knew Sooner",
    meta: "Alex Bennett • 1 Mar 2024 • 6 min read",
    hero: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvVgxv3dHKi-6ySDg16guPMuLfeKrYr6TNNA&s",
    content: `
      <p>These clever travel tips will save you time, money, and frustration—especially if you're planning a trip on a budget.</p>
      <h2>Top Hacks</h2>
      <ul>
        <li>Roll your clothes to save space</li>
        <li>Download Google Maps offline</li>
        <li>Always carry a power bank</li>
        <li>Travel mid-week for cheaper flights</li>
      </ul>
      <p>Efficiency makes the journey smoother and more enjoyable.</p>
    `,
  },
];

let currentPost = 0;

function loadPost(index) {
  if (!document.getElementById("blog-title")) return;

  const post = posts[index];
  document.getElementById("blog-tag").innerText = post.tag;
  document.getElementById("blog-title").innerText = post.title;
  document.getElementById("blog-meta").innerText = post.meta;
  document.getElementById("hero-image").src = post.hero;
  document.getElementById("blog-article").innerHTML = post.content;

  // Update back button text to show previous post title
  const backBtn = document.getElementById("dynamic-back");
  if (backBtn) {
    backBtn.innerText = `← Previous: ${
      posts[(index - 1 + posts.length) % posts.length].title
    }`;
  }
}

function loadNextPost() {
  currentPost = (currentPost + 1) % posts.length;
  loadPost(currentPost);
}

function loadPreviousPost() {
  currentPost = (currentPost - 1 + posts.length) % posts.length;
  loadPost(currentPost);
}

function submitComment(event) {
  // Prevent default form submission if inside a form
  if (event) event.preventDefault();

  const nameInput = document.getElementById("comment-name");
  const textInput = document.getElementById("comment-text");
  const commentList = document.getElementById("comment-list");

  if (!nameInput || !textInput || !commentList) return;

  const name = nameInput.value.trim();
  const text = textInput.value.trim();

  if (name === "" || text === "") {
    alert("Please enter your name and comment.");
    return;
  }

  const commentDiv = document.createElement("div");
  commentDiv.className = "comment";

  const nameElement = document.createElement("h4");
  nameElement.innerText = name;

  const textElement = document.createElement("p");
  textElement.innerText = text;

  commentDiv.appendChild(nameElement);
  commentDiv.appendChild(textElement);

  commentList.appendChild(commentDiv);

  // Clear inputs after posting comment
  nameInput.value = "";
  textInput.value = "";
}

// Initialize everything after DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  loadPost(0);

  const backBtn = document.getElementById("dynamic-back");
  if (backBtn) {
    backBtn.addEventListener("click", loadPreviousPost);
  }

  const nextBtn = document.querySelector(".next-btn.next");
  if (nextBtn) {
    nextBtn.addEventListener("click", loadNextPost);
  }

  const submitBtn = document.querySelector(".comment-form button");
  if (submitBtn) {
    submitBtn.addEventListener("click", submitComment);
  }
});
