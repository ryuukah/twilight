/* =========================================
   DESTINATION LINKS
========================================= */

const AR_URL =
  "https://ar.pinterest.com/ryurkive/photobook-%E6%A5%BDwings/wardrobecasual/";

const HAPPINESS_URL =
  "https://ar.pinterest.com/ryurkive/photobook-楽wings/wardrobeformal/";

const HAZY_MY_MELODY_URL =
  "https://app.notion.com/p/pretty-3c213bc2724c80c9895bf4de39ae0656";

const STARRY_SLEEP_URL =
  "https://app.notion.com/p/tiramissu-3c213bc2724c807bae01ebc026e9b668";


/* =========================================
   ELEMENTS
========================================= */

const audio =
  document.getElementById("hazyAudio");

const audioCard =
  document.getElementById("hazyHelloKitty");

const indicator =
  document.getElementById("playingIndicator");

const slider =
  document.getElementById("itemSlider");

const menuPanel =
  document.getElementById("menuPanel");


/* =========================================
   NAVIGATION
========================================= */

function go(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}


/* =========================================
   HAZY SLEEP AUDIO
========================================= */

async function toggleAudio() {

  if (audio.paused) {

    try {

      await audio.play();

      audioCard.classList.add(
        "is-playing"
      );

      indicator.textContent =
        "♫ playing";

    } catch (error) {

      console.error(
        "Audio could not start:",
        error
      );

    }

  } else {

    audio.pause();

    audio.currentTime = 0;

    audioCard.classList.remove(
      "is-playing"
    );

  }

}


/* CLICK */

audioCard.addEventListener(
  "click",
  toggleAudio
);


/* KEYBOARD */

audioCard.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault();

      toggleAudio();

    }

  }
);


/* WHEN AUDIO FINISHES */

audio.addEventListener(
  "ended",
  () => {

    audioCard.classList.remove(
      "is-playing"
    );

  }
);


/* =========================================
   ITEM LINKS
========================================= */


/* HAZY SLEEP — MY MELODY */

document
  .getElementById("hazyMyMelody")
  .addEventListener(
    "click",
    () => {
      go(HAZY_MY_MELODY_URL);
    }
  );


/* STARRY SLEEP */

document
  .getElementById("starrySleep")
  .addEventListener(
    "click",
    () => {
      go(STARRY_SLEEP_URL);
    }
  );


/* =========================================
   TOP TABS
========================================= */


/* POSE FOR AR */

document
  .getElementById("arTab")
  .addEventListener(
    "click",
    () => {
      go(AR_URL);
    }
  );


/* HAPPINESS */

document
  .getElementById("happinessTab")
  .addEventListener(
    "click",
    () => {
      go(HAPPINESS_URL);
    }
  );


/* FURNITURE */

document
  .getElementById("furnitureTab")
  .addEventListener(
    "click",
    () => {

      alert(
        "Furniture is not set up yet."
      );

    }
  );


/* CLOTHES */

document
  .getElementById("clothesTab")
  .addEventListener(
    "click",
    () => {

      document
        .querySelector(".items-window")
        .scrollTo({
          left: 0,
          behavior: "smooth"
        });

    }
  );


/* =========================================
   BACK BUTTON
========================================= */

document
  .getElementById("backButton")
  .addEventListener(
    "click",
    () => {

      if (window.history.length > 1) {

        window.history.back();

      } else {

        window.location.href =
          "index.html";

      }

    }
  );


/* =========================================
   PLUS BUTTON
========================================= */

document
  .getElementById("plusButton")
  .addEventListener(
    "click",
    () => {

      const count =
        document.getElementById(
          "sparkleCount"
        );

      count.textContent =
        Number(
          count.textContent
            .replace(/,/g, "")
        ) + 1;

    }
  );


/* =========================================
   SHOP BUTTON
========================================= */

document
  .getElementById("shopButton")
  .addEventListener(
    "click",
    () => {

      document
        .querySelector(".items-window")
        .scrollTo({
          left: 0,
          behavior: "smooth"
        });

    }
  );


/* =========================================
   MENU
========================================= */

document
  .getElementById("menuButton")
  .addEventListener(
    "click",
    () => {

      const open =
        menuPanel.hidden;

      menuPanel.hidden =
        !open;

      document
        .getElementById("menuButton")
        .setAttribute(
          "aria-expanded",
          String(open)
        );

    }
  );


/* MENU → CLOTHES */

document
  .getElementById("menuClothes")
  .addEventListener(
    "click",
    () => {

      menuPanel.hidden = true;

      document
        .querySelector(".items-window")
        .scrollTo({
          left: 0,
          behavior: "smooth"
        });

    }
  );


/* MENU → AR */

document
  .getElementById("menuAR")
  .addEventListener(
    "click",
    () => {
      go(AR_URL);
    }
  );


/* MENU → HAPPINESS */

document
  .getElementById("menuHappiness")
  .addEventListener(
    "click",
    () => {
      go(HAPPINESS_URL);
    }
  );


/* =========================================
   ITEM SLIDER
========================================= */

const cards =
  [
    ...document.querySelectorAll(
      ".item-card"
    )
  ];


slider.addEventListener(
  "input",
  () => {

    const index =
      Number(slider.value);

    cards[index].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });

  }
);


/* =========================================
   KEEP SLIDER POSITION IN SYNC
========================================= */

const itemsWindow =
  document.querySelector(
    ".items-window"
  );


const observer =
  new IntersectionObserver(
    (entries) => {

      const visible =
        entries
          .filter(
            entry =>
              entry.isIntersecting
          )
          .sort(
            (a, b) =>
              b.intersectionRatio -
              a.intersectionRatio
          )[0];


      if (visible) {

        const index =
          cards.indexOf(
            visible.target
          );

        if (index >= 0) {

          slider.value =
            index;

        }

      }

    },
    {
      root: itemsWindow,

      threshold: [
        0.55,
        0.8
      ]
    }
  );


cards.forEach(
  card =>
    observer.observe(card)
);
