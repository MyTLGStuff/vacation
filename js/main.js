document.addEventListener("DOMContentLoaded", () => {
    document
        .querySelector('#destination-form')
        .addEventListener('submit', handleFormSubmit);
});

const handleFormSubmit = (e) => {
    e.preventDefault();
    const destination_name = e.target.elements['destinationName'].value;
    const location_name = e.target.elements['locationName'].value;
    const description = e.target.elements['descriptionTextarea'].value;

    resetForm(e.target);

    const card = createCard(
        destination_name,
        location_name,
        description,
    );

    const container = document.querySelector('#destinations');

    container.children.length !== 0 ? document.querySelector('#destinations-title').innerHTML = 'My Wishlist' :
        document.querySelector('#destinations-title').innerHTML = 'Enter destination details';

    document
        .querySelector('#destinations')
        .appendChild(card);
}

const resetForm = (form) => {
    for (var i = 0; i < form.length; i++) {
        form.elements[i].value = "";
    }
}

const createCard = (name, loc, desc) => {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.style.width = '15rem';
    card.style.height = 'fit-content';
    card.style.margin = '1.5rem';

    const image = document.createElement('img');
    image.setAttribute('class', 'card-img-top');
    image.setAttribute('alt', name);

    // const url = 'img/top-travel-destination-for-visas-900x504.jpg';
    let clientKey = 'n_1WRKWWIdPREfw3xMzPgCFmFcENd4fheBqD_FmPdsk';
    let url = 'https://api.unsplash.com/photos/random?client_id=' + clientKey + '&query=' + name + '';

    getImage(url).then(imageUrl => {
        image.setAttribute('src', imageUrl);
    });

    card.appendChild(image);

    const body = document.createElement('div');
    body.setAttribute('class', 'card-body');

    const title = document.createElement('h5');
    title.setAttribute('class', 'card-title');
    title.innerText = name;
    body.appendChild(title);

    const subtitle = document.createElement('h6');
    subtitle.setAttribute('class', ' card-subtitle mb-2 text-muted');
    subtitle.innerText = loc;
    body.appendChild(subtitle);

    if (desc !== 0) {
        const text = document.createElement('p');
        text.setAttribute('class', 'card-text');
        text.innerText = desc;
        body.appendChild(text);
    }

    const container = document.createElement('div');
    container.setAttribute('class', 'card-buttons');

    const edit = document.createElement('button');
    edit.setAttribute('class', 'btn btn-warning');
    edit.innerText = 'Edit';
    edit.addEventListener('click', editDest);
    container.appendChild(edit);

    const remove = document.createElement('button');
    remove.setAttribute('class', 'btn btn-danger');
    remove.innerText = 'Remove';
    remove.addEventListener('click', removeDest);
    container.appendChild(remove);

    body.appendChild(container);
    card.appendChild(body);

    return card;
}

const editDest = (e) => {
    const card = e.target.parentElement.parentElement;
    const title = card.children[0];
    const subtitle = card.children[1];

    const body = card.parentElement;
    const image = body.children[0];

    var newTitle = window.prompt('Enter new name');
    var newSubtitle = window.prompt('Enter new location');
    var newImage = window.prompt('Enter new photo url');

    newTitle.length > 0 ? title.innerText = newTitle : title.innerText = e.target.elements.title.value;
    newSubtitle.length > 0 ? subtitle.innerText = newSubtitle : subtitle.innerText = e.target.elements.subtitle.value;
    newImage.length > 0 ? image.innerText = newImage : image.innerText = e.target.elements.image.value;
}

const removeDest = (e) => {
    const body = e.target.parentElement.parentElement;
    const card = body.parentElement;
    card.remove();
}

const getImage = async(url) => {

    return await fetch(url)
        .then(response => response.json())
        .then(data => {
            return data.urls.small
        })
        .catch(error => 
            console.error(error)
        );
}