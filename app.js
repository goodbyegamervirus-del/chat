// Your Firebase config here:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const postsRef = ref(db, "posts");

const postsEl = document.getElementById("posts");
const form = document.getElementById("composer");
const nameInput = document.getElementById("name");
const textInput = document.getElementById("text");

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = nameInput.value || "anon";
  const text = textInput.value.trim();
  if (!text) return;
  push(postsRef, { name, text, ts: Date.now() });
  textInput.value = "";
});

onChildAdded(postsRef, snapshot => {
  const data = snapshot.val();
  const dt = new Date(data.ts).toLocaleString();
  const div = document.createElement("div");
  div.className = "post";
  div.innerHTML = `<div class="meta">${data.name} • ${dt}</div><div>${data.text}</div>`;
  postsEl.prepend(div);
});
