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

const itemsWindow =
  document.querySelector(".items-window");

const cards = [
  ...document.querySelectorAll(".item-card")
];


/* =========================================
   HAZY SLEEP — HELLO KITTY AUDIO
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


/* CLICK AUDIO ITEM */

audioCard.addEventListener(
  "click",
  toggleAudio
);


/* KEYBOARD AUDIO ITEM */

audioCard.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault();

      toggleAudio();

    }

  }
);


/* AUDIO FINISHED */

audio.addEventListener(
  "ended",
  function () {

    audioCard.classList.remove(
      "is-playing"
    );

  }
);


/* =========================================
   FURNITURE
========================================= */

document
  .getElementById("furnitureTab")
  .addEventListener(
    "click",
    function () {

      alert(
        "Furniture is not set up yet."
      );

    }
  );


/* =========================================
   CLOTHES TAB
========================================= */

document
  .getElementById("clothesTab")
  .addEventListener(
    "click",
    function () {

      itemsWindow.scrollTo({
        left: 0,
        behavior: "smooth"
      });

    }
  );


/* =========================================
   SHOP BUTTON
========================================= */

document
  .getElementById("shopButton")
  .addEventListener(
    "click",
    function () {

      itemsWindow.scrollTo({
        left: 0,
        behavior: "smooth"
      });

    }
  );


/* =========================================
   PLUS BUTTON
========================================= */

document
  .getElementById("plusButton")
  .addEventListener(
    "click",
    function (event) {

      /*
       * Prevents the click from affecting
       * anything behind the button.
       */

      event.stopPropagation();

      const count =
        document.getElementById(
          "sparkleCount"
        );

      const current =
        Number(
          count.textContent
            .replace(/,/g, "")
        );

      count.textContent =
        current + 1;

    }
  );


/* =========================================
   BACK BUTTON
========================================= */

document
  .getElementById("backButton")
  .addEventListener(
    "click",
    function () {

      window.history.back();

    }
  );


/* =========================================
   MENU BUTTON
========================================= */

document
  .getElementById("menuButton")
  .addEventListener(
    "click",
    function () {

      const shouldOpen =
        menuPanel.hidden;

      menuPanel.hidden =
        !shouldOpen;

      document
        .getElementById("menuButton")
        .setAttribute(
          "aria-expanded",
          String(shouldOpen)
        );

    }
  );


/* =========================================
   MENU → CLOTHES
========================================= */

document
  .getElementById("menuClothes")
  .addEventListener(
    "click",
    function () {

      menuPanel.hidden = true;

      itemsWindow.scrollTo({
        left: 0,
        behavior: "smooth"
      });

    }
  );


/* =========================================
   SLIDER
========================================= */

slider.addEventListener(
  "input",
  function () {

    const index =
      Number(slider.value);

    if (!cards[index]) {
      return;
    }

    cards[index].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });

  }
);


/* =========================================
   KEEP SLIDER IN SYNC
========================================= */

const observer =
  new IntersectionObserver(
    function (entries) {

      const visible =
        entries
          .filter(
            function (entry) {
              return entry.isIntersecting;
            }
          )
          .sort(
            function (a, b) {

              return (
                b.intersectionRatio -
                a.intersectionRatio
              );

            }
          )[0];


      if (!visible) {
        return;
      }


      const index =
        cards.indexOf(
          visible.target
        );


      if (index >= 0) {

        slider.value =
          index;

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
  function (card) {

    observer.observe(card);

  }
);


/* =========================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener(
  "click",
  function (event) {

    const menuButton =
      document.getElementById(
        "menuButton"
      );

    if (
      menuPanel.hidden ||
      menuPanel.contains(event.target) ||
      menuButton.contains(event.target)
    ) {

      return;

    }

    menuPanel.hidden = true;

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

  }
);
