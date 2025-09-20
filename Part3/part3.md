# Tutorial: Image Transformations Using the JavaScript SDK

## Meta description

In this tutorial, you will build a simple HTML/CSS/JS app that uses the Cloudinary JavaScript SDK to load images and apply transformations like resizing, cropping, and effects.

---

## Overview

In this tutorial, you’ll build a simple HTML/CSS/JS app that:

* Loads an image from Cloudinary.
* Renders it in the browser.
* Applies a transformation (Cartoonify) at the click of a button.

You can try out the final product here:
\<placeholder for CodePen/GitHub link or embed>

---

## Why transformations are important

Transformations let you dynamically resize, crop, adjust quality, and apply effects to your media. This ensures every user receives an optimized version—without needing to create or store multiple files.

## Why the JavaScript SDK is important

Transformations can be applied by manually constructing delivery URLs. However, the JavaScript SDK makes this process simpler and less error-prone by providing a clear, chainable API for defining transformations in code. Behind the scenes, both approaches achieve the same result.

---

## Step 0: Base HTML & CSS

For this tutorial, only the Cloudinary JavaScript SDK is required. The HTML and CSS are already provided.

**Project layout**

```
/ (project root)
├─ index.html
└─ styles.css
```

> Note: The `<img>` element has an intentionally empty `src`. We’ll populate it with a Cloudinary image in Step 2.

### index.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="styles.css">
  <title>Cloudinary Demo</title>
</head>
<body>
  <div class="main">
    <div class="main-photo">
      <img id="main-img" src="" width="500" />
    </div>
    <div class="btn-group">
      <div class="btn" id="text-btn">Text overlay</div>
      <div class="btn" id="crop-btn">Crop to square</div>
      <div class="btn" id="cartoon-btn">Cartoonify <br>&nbsp;</br></div>
      <div class="btn" id="genremove-btn">Generative Remove</div>
      <div class="btn" id="reset-btn">Reset</div>
    </div>
  </div>

  <script type="module">
    // JavaScript code will go here
  </script>
</body>
</html>
```

### styles.css

```css
.main {
  width: 800px;
  margin: auto;
}
.main-photo {
  width: 500px;
  border: 5px solid black;
  margin: 20px 0;
  display: inline-block;
}
.main-photo img {
  width: 100%;
  height: auto;
  display: block;
}
.btn-group {
  width: 100%;
  text-align: center;
}
.btn {
  margin: 10px;
  padding: 2px 5px;
  float: left;
  width: 70px;
  border: 1px solid black;
  background-color: lightblue;
}
.btn:hover {
  cursor: pointer;
}
```

📷 **Screen state at this step:** The page shows an empty image frame (just the border) and the row of buttons underneath. The image area is intentionally blank.

---

## Step 1: Load an image from Cloudinary

Start by importing the **URL-Gen SDK** and creating a `CloudinaryImage` object. This object represents an image in your Cloudinary account and allows you to apply transformations. (For videos, use `CloudinaryVideo`.)

For now, use Cloudinary’s **demo cloud** and its public `sample` image. Later, replace these with your own cloud name and any public ID of an asset you’ve uploaded.

See [Quick Start: Account and Media Setup](https://cloudinary.com/documentation/quick_start#account_and_media_setup) to locate your cloud name and public IDs.

```js
import { Cloudinary } from "https://cdn.skypack.dev/@cloudinary/url-gen";

const CLOUD_NAME = "demo";
const PUBLIC_ID  = "sample";

const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });

let myImage = cld.image(PUBLIC_ID);
```

📷 **Screen state at this step:** The page layout is the same as Step 0 (empty image area), but now you have a `CloudinaryImage` object ready in your JavaScript. Nothing is displayed yet because we haven’t rendered the image.

---

## Step 2: Render the image

Update the `<img>` element’s `src` with the URL generated from the `CloudinaryImage` object. A helper function keeps the code reusable:

```js
const imgEl = document.getElementById("main-img");

function renderImage(imageElement, cloudinaryImage) {
  imageElement.src = cloudinaryImage.toURL();
}

renderImage(imgEl, myImage);
```

📷 **Screen state at this step:** The image frame now displays the `sample` image from Cloudinary. You should see the photo inside the bordered area, above the buttons.

---

## Step 3: Add the Cartoonify button

To implement **Cartoonify**, import the effect:

```js
import { cartoonify } from "https://cdn.skypack.dev/@cloudinary/url-gen/actions/effect";
```

Add a click listener to the button. When clicked, apply the effect to the `CloudinaryImage` and re-render:

```js
cartoonBtn.addEventListener("click", () => {
  myImage.effect(cartoonify());
  renderImage(imgEl, myImage);
});
```

### What’s happening

* `myImage` is a **mutable builder object**.
* Each call (such as `.effect(cartoonify())`) appends a transformation.
* The same instance can be reused and simply re-rendered after changes.

📷 **Screen state at this step:** When you click the **Cartoonify** button, the original image in the frame is updated to a cartoon-style version of itself.

---

✅ At this point, you have a working demo app that loads an image from Cloudinary and applies the Cartoonify transformation with one click.

---

Would you like me to also phrase those **screen state notes** as bold inline notes (like Cloudinary docs sometimes do: “**Result:** …”) instead of separate “📷 placeholders”? That would make it even closer to their doc style.
