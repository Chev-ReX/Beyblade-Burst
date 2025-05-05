let stamina1 = 100, stamina2 = 100;
let wins1 = 0, wins2 = 0;
let interval;

const launchSound = document.getElementById("launchSound");
const burstSound = document.getElementById("burstSound");

function startBattle() {
  stamina1 = 100;
  stamina2 = 100;
  updateHealthBars();

  launchSound.play();
  document.getElementById("status").textContent = "Beyblades launched! Battle begins...";

  resumeSpinning();

  interval = setInterval(() => {
    // Random damage types
    let hitType = ["normal", "burst", "defense"][Math.floor(Math.random() * 3)];
    let damage1 = getDamage(hitType);
    let damage2 = getDamage(hitType);

    stamina1 -= damage1;
    stamina2 -= damage2;

    updateHealthBars();

    if (stamina1 <= 0 || stamina2 <= 0) {
      clearInterval(interval);
      stamina1 = Math.max(stamina1, 0);
      stamina2 = Math.max(stamina2, 0);

      let result = "";
      if (stamina1 > stamina2) {
        wins1++;
        result = "Red Beyblade Wins!";
      } else if (stamina2 > stamina1) {
        wins2++;
        result = "Blue Beyblade Wins!";
      } else {
        result = "It's a Draw!";
      }

      if (hitType === "burst") burstSound.play();
      document.getElementById("status").textContent = result;

      document.getElementById("wins1").textContent = wins1;
      document.getElementById("wins2").textContent = wins2;

      stopSpinning();
    }
  }, 500);
}

function getDamage(type) {
  switch (type) {
    case "burst": return Math.random() * 10 + 10;
    case "defense": return Math.random() * 2 + 1;
    default: return Math.random() * 5 + 2;
  }
}

function resetBattle() {
  clearInterval(interval);
  stamina1 = 100;
  stamina2 = 100;
  updateHealthBars();
  document.getElementById("status").textContent = "Ready to battle!";
  resumeSpinning();
}

function updateHealthBars() {
  document.getElementById("health1").value = stamina1;
  document.getElementById("health2").value = stamina2;
}

function stopSpinning() {
  document.getElementById("beyblade1").style.animation = "none";
  document.getElementById("beyblade2").style.animation = "none";
}

function resumeSpinning() {
  document.getElementById("beyblade1").style.animation = "spin 0.5s linear infinite";
  document.getElementById("beyblade2").style.animation = "spin 0.5s linear infinite";
}
