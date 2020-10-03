loadImages();

function createEl(htmlString = "", className) {
  const el = document.createElement(htmlString);
  if (className) {
    el.setAttribute("class", className);
  }
  return el;
}

function initLazyImages() {
  const lazyImages = document.querySelectorAll(".lazy-image");

  function onIntersection(imageEntities) {
    imageEntities.forEach(image => {
      if (image.isIntersecting) {
        observer.unobserve(image.target);
        image.target.src = image.target.dataset.src;
      }
    });
  }

  const observer = new IntersectionObserver(onIntersection);

  lazyImages.forEach(image => observer.observe(image));
}

function loadImages() {
  fetch("/api/images")
    .then(res => res.json())
    .then(data => createCards(data))
    .then(() => initLazyImages());
}

function getCard() {
  for (let i=0; i < 36; i++){
    $.ajax({
      url: "https://api.scryfall.com/cards/random?q=is%3Aold",
      method: "GET"
    }).then(function (response) {
      var description = response.name
      var image = response.image_uris.normal
  
      let dbImage = {
        image: image,
        description: description,
        rating: 0
      }
  
      $.ajax({
        url: "api/images/create",
        method: "POST",
        data: dbImage,
      });
    
    });
  }
}

getCard();

function createCards(data) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  let lastRow;
  const row = createEl("div", "row");

  return data.forEach(function(image, index) {
    const col = createEl("div", "col-md-4 mt-4");
    col.appendChild(createCard(image));
    if (index % 3 === 0) {
      row.appendChild(col);
      container.appendChild(row);
      lastRow = row;
    }

    return lastRow.appendChild(col);
  });
}

function createCard(image) {
  const card = createEl("div", "card");
  const imageContainer = createEl("div", "card__image-container");
  const img = createEl("img", "card-img-top card__image--cover lazy-image");
  img.setAttribute(
    "src",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOMrgcAATsA3BT31OAAAAAASUVORK5CYII=");
  img.setAttribute("data-src", image.image);
  img.setAttribute("alt", image.description);

  const cardBody = createEl("div", "card-body");
  const ratingFormContainer = createEl("div", "rating d-flex justify-content-start");
  ratingFormContainer.setAttribute("data-id", image._id);
  ratingFormContainer.setAttribute("data-rating", image.rating);

  const ratingForm = createRatingForm(image);

  const cardText = createEl("p", "card-text font-weight-bold mt-2");

  cardText.innerText = `${image.description} (${image.rating})`;

  imageContainer.append(img);
  ratingFormContainer.append(ratingForm);
  cardBody.appendChild(ratingFormContainer);
  cardBody.appendChild(cardText);
  card.appendChild(imageContainer);
  card.appendChild(cardBody);

  return card;
}

function createRatingForm(image) {
  const labelText = {
    1: "One Star",
    2: "Two Stars",
    3: "Three Stars",
    4: "Four Stars",
    5: "Five Stars"
  };

  const form = createEl("form");
  form.setAttribute("action", "post");

  for (let i = 1; i <= 5; i++) {
    const input = createEl("input", "visuallyhidden");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "rating");
    input.setAttribute("id", `${image._id}-star-${i}`);
    input.setAttribute("value", i);

    const label = createEl("label");
    label.setAttribute("for", `${image._id}-star-${i}`);
    const labelSpan = createEl("span", "visuallyhidden");
    labelSpan.innerText = labelText[i];
    const star = createEl("i", `fa-star ${image.rating >= i ? "fas" : "far"}`);

    label.appendChild(labelSpan);
    label.appendChild(star);
    label.onclick = updateRating;
    form.appendChild(input);
    form.appendChild(label);
  }

  return form;
}

function updateRating(event) {
  const [id, , rating] = event.currentTarget.getAttribute("for").split("-");
  fetch(`/api/images/${id}`, {
    method: "PUT",
    body: JSON.stringify({ rating }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function() {
    loadImages();
  });
}

let email = String.fromCodePoint(0x1F4E7) 
let phone = String.fromCodePoint(0x1F4DE)
let wrench = String.fromCodePoint(0x1F527)
let mma = String.fromCodePoint(0x1F3EB)
let gym = String.fromCodePoint(0x1F6B6)

console.log('%cHello.', 'background-color: maroon; font-size: 3rem; padding:10px;')
console.log(`%cI'm Nicholas LaMonaco`, 'background-color: maroon; font-size: 1.5rem; padding:5px;')
console.log(`%cAn aspiring full-stack web developer from New Jersey.`, 'background-color: maroon; font-size: 1rem; padding:5px;')
console.log(`%c${email} nlamonaco86@gmail.com`, `background-color: maroon; font-size: 1rem; padding:5px;`)
console.log(`%c${phone} 908-337-9307`, `background-color: maroon; font-size: 1rem; padding:5px;`)
console.log(`%cAbout`, 'font-size: 2rem; padding:8px;')
console.log(`%cWith a minimalist, lightweight approach, I can create effective, efficient, user-friendly and enjoyable web applications for a wide variety of uses. I learn quickly and I'm not afraid to try new ways of doing things.`, 'font-size: .85rem;')
console.log(`%cLinks`, 'font-size: 2rem; padding:8px;')
console.log(`%cGithub: http://github.com/nlamonaco86`, 'font-size: .8rem;')
console.log(`%cResume: https://nlamonaco86.github.io/Portfolio/assets/resume.pdf`, 'font-size: .8rem;')
console.log(`%cLinkedIn: https://www.linkedin.com/in/nicholas-la-monaco-98b5501b3/`, 'font-size: .8rem;')
console.log(`%cMy Projects`, 'font-size: 2rem; padding:8px;')
console.log(`%c${wrench} repairTracker: http://repairtracker.herokuapp.com`, 'font-size: 1rem;')
console.log(`%c${mma} MMA Scheduling: https://guarded-hamlet-46204.herokuapp.com/`, 'font-size: 1rem;')
console.log(`%c${gym} fullStack Fitness: https://fullstackfitness.herokuapp.com/`, 'font-size: 1rem;')
console.log(`%cDon't Say Goodbye!`, 'background-color: maroon; font-size: 2rem; padding:10px;')
console.log(`%c${email} nlamonaco86@gmail.com`, `background-color: maroon; font-size: 1rem; padding:5px;`)
console.log(`%c${phone} 908-337-9307`, `background-color: maroon; font-size: 1rem; padding:5px;`)
