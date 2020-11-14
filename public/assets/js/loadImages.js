let dataArray = [];

const createEl = (htmlString = "", className) => {
  const el = document.createElement(htmlString);
  if (className) {
    el.setAttribute("class", className);
  }
  return el;
}

const loadImages = () => {
  fetch("/api/images")
    .then(res => res.json())
    .then(data => {
      dataArray = data;
      createCards(dataArray);
    });
}

loadImages();

const getCards = (event) => {
  event.preventDefault();
  for (let i = 0; i < 9; i++) {
    fetch("https://api.scryfall.com/cards/random?q=is%3Aold", { type: "GET" }).then((response) => {
      return response.json();
    })
      .then(response => {
        console.log(response.image_uris)
        if (response.error) { console.log(error) }
        let dbImage = {
          image: response.image_uris.normal,
          description: response.name,
          rating: 0
        }
        fetch('api/images/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify(dbImage),
        })
          .then(response => {
            if (response.error){ console.log(error) }
          })

      })
  }
}

// event listeners are conditional, to prevent errors in case the element is not there
let imageButton = document.getElementById('loadMore');
if (imageButton) {
  imageButton.addEventListener('click', (event) => {
    // Search for 9 more cards
    getCards(event);
    // Give Scryfall and Heroku a few seconds to work, so wait 3 seconds to reload the page
    // and scroll to the bottom so we see the newest images
    setTimeout(() => { window.location.reload("/") }, 3000);
  })
};

const createCards = (data) => {
  const container = document.getElementsByClassName("container")[0];
  container.innerHTML = "";
  let lastRow;
  const row = createEl("div", "row");

  return data.forEach((image, index) => {
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

const createCard = (image) => {
  const card = createEl("div", "card");
  const imageContainer = createEl("div", "card__image-container");
  const img = createEl("img", "card-img-top card__image--cover");
  img.setAttribute("src", image.image);
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

const createRatingForm = (image) => {
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
    label.addEventListener("click", updateRating);
    form.appendChild(input);
    form.appendChild(label);
  }

  return form;
}

const updateRating = (event) => {
  event.preventDefault();
  const [id, , rating] = event.currentTarget.getAttribute("for").split("-");

  fetch(`/api/images/${id}`, {
    method: "PUT",
    body: JSON.stringify({ rating }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(() => {
    loadImages();
  }).catch((err) => {
    console.log(err);
    dataArray.forEach((item) => {
      if (item._id === id) {
        item.rating = rating;
      }
    });
    createCards(dataArray);
  });
}
