const CLOUD_NAME = "demo";
const PUBLIC_ID = "sample.jpg";

const TRANSFORMS = {
    overlay: "c_fit,l_text:Arial_50:Overlay%20Text,co_white",
    cartoon: "e_cartoonify",
    square: "c_fill,g_auto,w_333,ar_1",
    gen_remove: "e_gen_remove:prompt_the%20bee",
    reset: ""
};

function buildUrl(cloudName, publicId, transformation = "") {
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
    if (transformation) {
        return `${baseUrl}/${transformation}/${publicId}`;
    } else {
        return `${baseUrl}/${publicId}`;
    }
}

const img = document.getElementById("main-img");
const group = document.querySelector(".btn-group");
const url_text = document.getElementById("url-text");
const toggleDebug = document.getElementById("toggle-debug");
const debugInfo = document.getElementById("debug-info");

url_text.innerHTML = buildUrl(CLOUD_NAME, PUBLIC_ID); // initial URL

toggleDebug.addEventListener("change", () => {
  debugInfo.style.display = toggleDebug.checked ? "block" : "none";
});

group.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn[data-action]");
    const action = btn.dataset.action;

    const trans = TRANSFORMS[action];
    const fullUrl = buildUrl(CLOUD_NAME, PUBLIC_ID, trans);

    img.src = fullUrl;
    
    url_text.innerHTML = fullUrl.replace(trans, `<b>${trans}</b>`);
});