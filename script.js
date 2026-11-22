const classes = ["img1", "img2", "img3", "img4", "img5"];
const dup = classes[Math.floor(Math.random() * 5)];
const order = [...classes, dup];

for (let i = order.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [order[i], order[j]] = [order[j], order[i]];
}

let selected = []; 
let result = null; 

const h3 = document.createElement("h3");
h3.id = "h";
h3.textContent = "Please click on the identical tiles to verify that you are not a robot.";
document.body.appendChild(h3);

const tiles = document.createElement("div");
document.body.appendChild(tiles);

const controls = document.createElement("div");
document.body.appendChild(controls);

order.forEach((cls) => {
  const img = document.createElement("img");
  img.className = cls;
  img.addEventListener("click", () => {
    if (result !== null || selected.includes(img)) return; // same tile twice -> ignored
    selected.push(img);
    updateControls();
  });
  tiles.appendChild(img);
});

function updateControls() {
  controls.innerHTML = "";

  if (selected.length >= 1) {
    const reset = document.createElement("button");
    reset.id = "reset";
    reset.innerHTML = "Reset";
    reset.addEventListener("click", () => {
      selected = [];
      result = null;
      updateControls();
    });
    controls.appendChild(reset);
  }

  if (selected.length === 2 && result === null) {
    const verify = document.createElement("button");
    verify.id = "verify";
    verify.innerHTML = "Verify";
    verify.addEventListener("click", () => {
      result = selected[0].className === selected[1].className ? "human" : "robot";
      updateControls();
    });
    controls.appendChild(verify);
  }

  if (result !== null) {
    const p = document.createElement("p");
    p.id = "para";
    p.textContent =
      result === "human"
        ? "You are a human. Congratulations!"
        : "We can't verify you as a human. You selected the non-identical tiles.";
    controls.appendChild(p);
  }
}