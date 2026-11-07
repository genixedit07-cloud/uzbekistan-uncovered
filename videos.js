/* ============================================================
   SHU YERNI O'ZINGIZ TAHRIRLAYSIZ
   ============================================================ */

// Videolar ro'yxati. Yangi video qo'shish uchun bitta qator yozing:
//   { title: "Video nomi", url: "https://youtu.be/XXXXXXXXXXX" },
// Rasm (thumbnail) havoladan avtomatik olinadi.
const VIDEOS = [
  { title: "Samarkand in 30 Seconds: Registan, Tigers & a 600-Year-Old Observatory", url: "https://youtube.com/shorts/iXD1IMzalR8" },
  { title: "I Asked Claude to Plan My Day in Samarkand", url: "https://youtube.com/shorts/DWiLqtJvkCs" },
];

// Aloqa ma'lumotlari. Havola bo'sh ("") bo'lsa, tugma ko'rinmaydi.
const CONTACT = {
  email: "genixedit07@gmail.com",
  socials: {
    YouTube: "https://www.youtube.com/@uzbekistan_uncovered",
    Instagram: "",
    TikTok: "",
    Facebook: "",
    X: "",
  },
};

/* ============================================================
   PASTDAGI KODNI O'ZGARTIRISH SHART EMAS
   ============================================================ */

// Havoladan video ID sini ajratib olish (youtu.be, watch?v=, shorts/)
function getVideoId(url) {
  const m = String(url).match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Tik rasm topilmasa oddiy rasmga o'tish, u ham bo'lmasa olib tashlash
function thumbFallback(img, id) {
  if (img.src.includes("oar2.jpg")) {
    img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  } else {
    img.remove();
  }
}

function renderVideos() {
  const grid = document.getElementById("video-grid");
  if (!VIDEOS.length) {
    // Namuna kartochka (videolar hali qo'shilmagan)
    grid.innerHTML = `
      <a class="video-card" href="https://www.youtube.com/@uzbekistan_uncovered/videos" target="_blank" rel="noopener">
        <div class="thumb"><span class="play"></span></div>
        <div class="video-body">
          <h3>New videos are on the channel</h3>
          <span class="watch">Watch on YouTube →</span>
        </div>
      </a>
      <p class="placeholder-note">More videos coming soon.</p>`;
    return;
  }
  grid.innerHTML = VIDEOS.map(v => {
    const id = getVideoId(v.url);
    const isShort = /\/shorts\//.test(v.url);
    let img = "";
    if (id && isShort) {
      // Shorts: orqada xira fon + markazda tik rasm
      const src = `https://i.ytimg.com/vi/${id}/oar2.jpg`;
      img = `
        <img class="bg" src="${src}" alt="" loading="lazy" onerror="thumbFallback(this, '${id}')">
        <img class="fg" src="${src}" alt="" loading="lazy" onerror="thumbFallback(this, '${id}')">
        <span class="badge-shorts">SHORTS</span>`;
    } else if (id) {
      img = `<img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy" onerror="this.remove()">`;
    }
    return `
      <a class="video-card${isShort ? " short" : ""}" href="${escapeHtml(v.url)}" target="_blank" rel="noopener">
        <div class="thumb">${img}<span class="play"></span></div>
        <div class="video-body">
          <h3>${escapeHtml(v.title)}</h3>
          <span class="watch">Watch now →</span>
        </div>
      </a>`;
  }).join("");
}

function renderContact() {
  const email = document.getElementById("contact-email");
  if (CONTACT.email) {
    email.href = "mailto:" + CONTACT.email;
    email.textContent = CONTACT.email;
  } else {
    email.remove();
  }
  document.getElementById("socials").innerHTML = Object.entries(CONTACT.socials)
    .filter(([, link]) => link)
    .map(([name, link]) => `<a class="social" href="${escapeHtml(link)}" target="_blank" rel="noopener">${escapeHtml(name)}</a>`)
    .join("");
  document.getElementById("year").textContent = new Date().getFullYear();
}

renderVideos();
renderContact();
