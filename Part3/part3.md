# Tutorial: Apply Image Transformations with the JavaScript SDK

## Meta description

Build a simple HTML/CSS/JS app that uses the Cloudinary JavaScript SDK to load images and apply transformations like resizing, text overlays, and effects.

---

## Overview

In this tutorial, you’ll build a simple HTML/CSS/JS app that:

* Loads an image from Cloudinary.
* Renders it in the browser.
* Applies a transformation at the click of a button.

**Time to complete:** 10 minutes.

You can try out the final app here:
\<placeholder for CodePen/GitHub link or embed>

---

## Introduction

### Why use image transformations?

Transformations let you dynamically resize, crop, adjust quality, and apply effects to your media. This ensures every user receives an optimized version without needing to create or store multiple files.

### Why use the JavaScript SDK?

Transformations can be applied by manually constructing delivery URLs. However, the JavaScript SDK makes this process simpler and less error-prone by providing a clear, chainable API for defining transformations in code. Behind the scenes, both approaches achieve the same result.

---

## 1. Prepare the HTML and CSS scaffold

This tutorial focuses on the Cloudinary JavaScript SDK. To keep things simple, the HTML and CSS are provided for you.

**Project layout**

```
/ (project root)
├─ index.html
└─ styles.css
```

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

📷 Sceen placeholder.

The page shows an empty image frame (just the border) with the row of buttons underneath. The image area is intentionally blank because the `<img>` element has no `src`. We'll populate it with an image in Step 2.

---

## 2. Load an image from Cloudinary

From this step onward, we'll only update the JavaScript section of our project.

Replace the comment placeholder in `index.html` with the following code. It imports the URL-Gen SDK and creates a `CloudinaryImage object`, which represents an image stored in a Cloudinary account.

```js
import { Cloudinary } from "https://cdn.skypack.dev/@cloudinary/url-gen";

const CLOUD_NAME = "demo";
const PUBLIC_ID  = "sample.jpg";

const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });

let myImage = cld.image(PUBLIC_ID);
```

In this example, we use the Cloudinary demo account (`demo`), which already contains the `sample.jpg` image. Later, you can replace these with your own cloud name and asset by following the instructions at the end of this tutorial.

---

## Step 3: Render the image

Add the following code to update the `<img>` element's src with the URL generated from the `CloudinaryImage` object. A helper function keeps the code reusable:

```js
const imgEl = document.getElementById("main-img");

function renderImage(imageElement, cloudinaryImage) {
  imageElement.src = cloudinaryImage.toURL();
}

renderImage(imgEl, myImage);
```

📷 Sceen placeholder.

---

## 4. Implement the Cartoonify effect

Import the effect:

```js
import { cartoonify } from "https://cdn.skypack.dev/@cloudinary/url-gen/actions/effect";
```

Add a click listener to the **Cartoonify button**. When clicked, it applies the effect to the `CloudinaryImage` and re-render it using the `renderImage` function defined in the previous step:

```js
document.getElementById("cartoon-btn").addEventListener("click", () => {
  myImage.effect(cartoonify());
  renderImage(imgEl, myImage);
});
```

`myImage` is a **mutable builder object**. Each call you make, such as `.effect(cartoonify())`, appends a transformation to it. Because of this, the same instance can be reused and simply re-rendered after changes.

📷 Sceen placeholder.

## 5. Implement text overlay

Import the text overlay action:

```js
import { source } from "https://cdn.skypack.dev/@cloudinary/url-gen/actions/overlay";
import { text } from "https://cdn.skypack.dev/@cloudinary/url-gen/qualifiers/source";
import { TextStyle } from "https://cdn.skypack.dev/@cloudinary/url-gen/qualifiers/textStyle";
```

Add a click listener to the **Text overlay** button. When clicked, it applies a text overlay to the CloudinaryImage and re-renders:

```js
document.getElementById("text-btn").addEventListener("click", () => {
  myImage.overlay(
    source(
      text("Overlay Text", new TextStyle("Arial", 50)).textColor("white")
    )
  );
  renderImage(imgEl, myImage);
});
```

The `overlay()` method adds a text layer on top of the base image. In this example, the text is 'Overlay Text', styled with the Arial font, size 50, and white color. 

📷 Sceen placeholder.

**Try it yourself:** experiment with different fonts, sizes, and colors.

## 5. Implement Crop to square
Import the resize action and gravity qualifier:

```js
import { fill } from "https://cdn.skypack.dev/@cloudinary/url-gen/actions/resize";
import { autoGravity } from "https://cdn.skypack.dev/@cloudinary/url-gen/qualifiers/gravity";
```

Add a click listener to the **Crop to square** button. When clicked, it resizes the `CloudinaryImage` to a 1:1 aspect ratio and re-renders it:

```js
document.getElementById("crop-btn").addEventListener("click", () => {
  myImage.resize(
    fill()
      .width(333)
      .aspectRatio("1:1")
      .gravity(autoGravity())
  );
  renderImage(imgEl, myImage);
});
```

The `resize().fill()` method crops and resizes the image to fit the specified dimensions. Here, we set the width to 333 pixels and enforce a 1:1 aspect ratio, which makes the image a square. The `autoGravity()` setting automatically selects the most important region of the image (like a face or object) so the crop stays focused.

📷 Sceen placeholder.

**Try it yourself:** Adjust the width or aspect ratio values to experiment with different crops, or remove the `.gravity(autoGravity())` command to see its effect.

## 7. Generative Remove

Let's add some AI magic with a generative effect. As before, start by importing the generative remove effect:

```js
import { generativeRemove } from "https://cdn.skypack.dev/@cloudinary/url-gen/actions/effect";
```

Add a click listener to the **Generative Remove** button. When clicked, it applies the effect with a prompt and then re-renders:

```js
document.getElementById("genremove-btn").addEventListener("click", () => {
  myImage.effect(
    generativeRemove().prompt("bee")
  );
  renderImage(imgEl, myImage);
});
```

`generativeRemove()` uses AI to remove a **single object or region** that matches your prompt and fills the gap with realistic pixels. Here the prompt is `"bee"`.

📷 Sceen placeholder.

**Try it yourself:** Replace `"bee"` with `"tree"`, `"person"`, or `"logo"` to remove different elements. Use more descriptive phrases, like `"red flower"` or `"text on the sign"`, to target specific details.

8. Reset button
To wrap up the app, let’s add a reset button that restores the image to its original state.

Add a click listener to the Reset button. When clicked, it creates a fresh CloudinaryImage pointing to the original asset and re-renders it:

```js
document.getElementById("reset-btn").addEventListener("click", () => {
  myImage = cld.image("sample");
  renderImage(imgEl, myImage);
});
```

The reset logic discards any transformations you’ve added to `myImage` by creating a new instance with the original public ID. The `renderImage` function then displays the untouched image again.