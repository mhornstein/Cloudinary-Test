const CLOUD_NAME = "demo";
const PUBLIC_ID = "sample.jpg";
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

const TRANSFORMS = {
    overlay: "c_fit,l_text:Arial_50:Overlay%20Text,co_white",
    cartoon: "e_cartoonify",
    square: "c_fill,g_auto,w_333,ar_1",
    reset: ""
};

function buildUrl(transformation = "") {
    if (transformation) {
        return `${BASE_URL}/${transformation}/${PUBLIC_ID}`;
    } else {
        return `${BASE_URL}/${PUBLIC_ID}`;
    }
}

const img = document.getElementById("main-img");
const group = document.querySelector(".btn-group");

group.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;
    if (!(action in TRANSFORMS)) return;
    img.src = buildUrl(TRANSFORMS[action]);
});