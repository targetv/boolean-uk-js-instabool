// write your code here

// <!-- <article class="image-card">
//         <h2 class="title">Title of image goes here</h2>
//         <img src="./assets/image-placeholder.jpg" class="image" />
//         <div class="likes-section">
//           <span class="likes">0 likes</span>
//           <button class="like-button">♥</button>
//         </div>
//         <ul class="comments">
//           <li>Get rid of these comments</li>
//           <li>And replace them with the real ones</li>
//           <li>From the server</li>
//         </ul>
//         <form class="comment-form">
//           <input
//             class="comment-input"
//             type="text"
//             name="comment"
//             placeholder="Add a comment..."
//           />
//           <button class="comment-button" type="submit">Post</button>
//         </form>
//       </article> -->

// const comments = fetch("http://localhost:3000/comments").then(function (
//   response
// ) {
//   return response.json();
// });
// console.log(images);

function commentCreate(comment) {
  return fetch(`http://localhost:3000/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: comment,
    }),
  }).then(function (repsonse) {
    return response.json();
  });
}

function createElem(tag, attrObjs) {
  const elem = document.createElement(tag);
  for (const key of Object.keys(attrObjs)) {
    elem[key] = attrObjs[key];
  }
  return elem;
}

function createCard(cardData) {
  const mainSection = createCardMain(cardData);
  const likeSection = cardLikes(cardData);
  const commentSection = cardComments(cardData.comments);
  const createCommentSection = createComments(cardData);
  mainSection.append(likeSection, commentSection, createCommentSection);
  return mainSection;
}

function createCardMain(cardData) {
  const articleEl = createElem("article", { className: "image-card" });
  const h2El = createElem("h2", { className: "title" });
  h2El.innerText = cardData.title;
  const imgEl = createElem("img", { src: cardData.image, className: "image" });
  articleEl.append(h2El, imgEl);
  return articleEl;
}

function cardLikes(cardData) {
  const divMain = createElem("div", { className: "likes-section" });
  const spanLike = createElem("span", {
    className: "likes",
    innerText: `${cardData.likes} likes`,
  });

  const buttonLike = createElem("button", {
    className: "like-button",
    innerText: `Like`,
  });
  buttonLike.addEventListener("click", function () {
    fetch(`http://localhost:3000/images/${cardData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: (cardData.likes += 1),
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        spanLike.innerText = `${data.likes} likes`;
      });
  });
  divMain.append(spanLike, buttonLike);
  return divMain;
}

function cardComments(commentData) {
  const ulMain = createElem("ul", { className: "comments" });
  for (let comment of commentData) {
    let liEl = createElem("li", { innerText: comment.content });
    liEl.innerText = comment.content;
    ulMain.append(liEl);
  }
  return ulMain;
}

function createComments(cardData) {
  const commentForm = createElem("form", { className: "comment-form" });
  const commentInput = createElem("input", {
    className: "comment-input",
    type: "text",
    name: "test",
    placeholder: "Add a comment...",
  });
  const commentButton = createElem("button", {
    className: "comment-button",
    type: "submit",
    innerText: "Post",
  });

  //   const userComment = {
  //     name: commentInput.test.value,
  //   };

  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const comment = {
      imageId: cardData.id,
      content: commentInput.value,
    };

    fetch(`http://localhost:3000/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: comment,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (newComment) {});

    commentForm.reset();
  });
  commentForm.append(commentInput, commentButton);
  return commentForm;
}

const container = document.querySelector(".image-container");

function instaCards(cards) {
  for (const card of cards) {
    const createdCard = createCard(card);
    container.append(createdCard);
  }
}
function getImages() {
  fetch("http://localhost:3000/images")
    .then(function (response) {
      return response.json();
    })
    .then(function (details) {
      console.log("Get");
      instaCards(details);
    });
}
getImages();
