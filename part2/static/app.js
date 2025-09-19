const CLOUD_NAME = "demo";
const PUBLIC_ID = "sample.jpg";
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

const TRANSFORMS = {
    overlay: "c_fit,l_text:Arial_50:Overlay%20Text,co_white",
    cartoon: "e_cartoonify",
    square: "c_fill,g_auto,w_333,ar_1",
    gen_remove: "e_gen_remove:prompt_the%20bee",
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
const url_text = document.getElementById("url-text");

url_text.innerHTML = BASE_URL; // initial URL

group.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn[data-action]");
    const action = btn.dataset.action;

    const trans = TRANSFORMS[action];
    const fullUrl = buildUrl(trans);

    img.src = fullUrl;
    
    url_text.innerHTML = fullUrl.replace(trans, `<b>${trans}</b>`);
});