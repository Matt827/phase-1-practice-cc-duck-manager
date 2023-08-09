//constants
const url = 'http://localhost:3000/ducks'
const nav = document.querySelector('#duck-nav')
const form = document.querySelector('#new-duck-form')
const displayName = document.querySelector("#duck-display-name")
const displayImg = document.querySelector("#duck-display-image")
const displayLikesBtn = document.querySelector("#duck-display-likes")


//Get
fetch(url)
.then(res => res.json())
.then(data => {
    data.forEach(renderNavDuck)
})

//display ducks in the nav
function renderNavDuck(data) {
    const img = document.createElement('img')
    img.src = data.img_url
    nav.appendChild(img)

    img.addEventListener('click', e => {
        renderDisplayDuck(data)
    })

}

//display duck in the duck-display
function renderDisplayDuck(data) {
    displayName.innerText = data.name
    displayImg.src = data.img_url
    displayLikesBtn.innerText = data.likes
}

//add event to like button, increment by 1
displayLikesBtn.addEventListener('click', e => {
    let likes = parseInt(displayLikesBtn.innerText)
    likes ++
    displayLikesBtn.innerText = likes

    const likeBtn = {
        'likes': displayLikesBtn.innerText
    }
    //PATCH request works but "needs way to switch between ids"
    fetch(`${url}/${1}`,{
        method: 'PATCH',
        headers: {
            'content-type':'application/json',
            'accept':'application/json'
        },
        body: JSON.stringify(likeBtn)
    })
    .then(res => res.json())
    .then(data => {})
})

//add submit event to form
form.addEventListener('submit', e => {
    e.preventDefault()

    const newDuck = {
        'name': e.target['duck-name-input'].value,
        'img_url': e.target['duck-image-input'].value,
        'likes': 0
    }
    //POST requst saves a new duck when submitted
    fetch(`${url}`,{
        method: 'POST',
        headers: {
            'content-type':'application/json',
            'accept':'application/json'
        },
        body: JSON.stringify(newDuck)
    })
    .then(res => res.json())
    .then(data => {
        renderNavDuck(data)
    })
})