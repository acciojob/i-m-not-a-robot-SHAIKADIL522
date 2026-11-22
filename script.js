//your JS code here. If required.
const classes = ["img1", "img2", "img3", "img4", "img5"];
const dup = classes[Math.floor(Math.random() * 5)];
const images = [...classes, dup];

// Fisher-Yates shuffle
for (let i = images.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [images[i], images[j]] = [images[j], images[i]];
}

let selected = [];
let result = null; // null | "human" | "robot"

const root = document.createElement("div");
document.body.appendChild(root);

function render() {
  root.innerHTML = "";

  const h3 = document.createElement("h3");
  h3.id = "h";
  h3.innerText = "Please click on the identical tiles to verify that you are not a robot.";
  root.appendChild(h3);

  images.forEach((cls, idx) => {
    const img = document.createElement("img");
    img.className = cls;
    img.addEventListener("click", () => {
      if (result !== null || selected.includes(idx)) return;
      selected.push(idx);
      render();
    });
    root.appendChild(img);
  });

  if (selected.length >= 1) {
    const reset = document.createElement("button");
    reset.id = "reset";
    reset.innerHTML = "Reset";
    reset.addEventListener("click", () => {
      selected = [];
      result = null;
      render();
    });
    root.appendChild(reset);
  }

  if (selected.length === 2 && result === null) {
    const verify = document.createElement("button");
    verify.id = "verify";
    verify.innerHTML = "Verify";
    verify.addEventListener("click", () => {
      result = images[selected[0]] === images[selected[1]] ? "human" : "robot";
      render();
    });
    root.appendChild(verify);
  }

  if (result !== null) {
    const p = document.createElement("p");
    p.id = "para";
    p.innerText =
      result === "human"
        ? "You are a human. Congratulations!"
        : "We can't verify you as a human. You selected the non-identical tiles.";
    root.appendChild(p);
  }
}

render();