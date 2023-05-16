'use strict';

const getBodyWidth = document.body.clientWidth;
const getElem = (id) => {
    const elem = document.querySelector(id);
    return elem;
};

const getElemS = (id) => {
    const elem = document.querySelectorAll(id);
    return elem;
};
const headerElem = getElem('header'),
    headerSearch = getElem('.header_search'),
    formSearch = getElem('.form_search'),
    inputSearch = getElem('#input_search'),
    h1Element = getElem('h1'),

    mainElem = getElem('main'),
    navMenu = getElem('.nav_menu'),
    navUl = getElem('nav ul'),
    wrapElem = getElem('.wrap'),
    filmElem = getElem('.film'),
    filmDescr = getElem('.film_descr'),


    outputFieldElem = getElem(".output_field"),
    output = document.querySelector('.output'),


    inputNameFilmElem = getElem('#movie_name'),
    inputYearFilmElem = getElem('#movie_year'),
    submitButElem = getElem('#add_to_DB'),
    radioElements = [
        getElem('#yes'), getElem('#no')
    ],
    // checkFormElem = getElem('#check_form'),


    dbOl = getElem('.db ol'),
    dbLiList = document.getElementsByClassName('dbList'),
    // dbSpanNumList = document.getElementsByClassName('num'),
    dbFieldsetElem = getElem('.db fieldset'),

    customizeElem = getElem('.customize'),
    customizeDBFieldsetElem = getElem('.customizeDB fieldset'),
    imgTrashList = document.getElementsByClassName('trash'),

    articleElem = getElem('article'),
    adElements = getElemS('.ad'),
    ad_arr = [];

adElements.forEach(item => {
    ad_arr.push(item.children[0])
})

const log = function (message) {
    output.insertAdjacentHTML('beforeend', `<span> ${message} </span><br>`)
}

const outputFieldScroll = function () {
    let getHeight = 0;
    getHeight += outputFieldElem.offsetHeight;
    // console.log(getHeight);

    outputFieldElem.style.height = `${getHeight}px`;
    outputFieldElem.scrollTop = outputFieldElem.scrollHeight;
    return getHeight;
}
submitButElem.disabled = true;



const movieDB = {
    movies: {
        2018: {
            "Cold War": true
        },

        2019: {
            "Portrait of a Lady on Fire": false,
            "Pain and Glory": false
        },

        2020: {
            "Another Round": true,
            "The Father": false
        }
    },
    addNewFilm: function (e) {


        if (inputNameFilmElem.value.trim() === "") {
            e.preventDefault();
            log("<span class='error'>Error:</span> Film name input - is empty..");
            outputFieldScroll();

            // console.warn("Incorrect input: Incorrect film name input..");
            // throw new Error("Incorrect input: Incorrect film name input..");
        } else {
            if (inputYearFilmElem.value.trim() === "" || !isYear(inputYearFilmElem.value) || inputYearFilmElem.value < 1800) {
                e.preventDefault();
                log("<span class='error'>Error:</span> Film year input - is empty or input.value incorrect..");
                outputFieldScroll();

                // console.warn("Incorrect input: Incorrect film year input..");
                //     throw new Error("Incorrect input: Incorrect film year input..");
            } else {

                e.preventDefault();
                const getFavoriteChecked = ()=>{
                    for(let i=0; i < radioElements.length; i++){
                        if(radioElements[i].checked === true){
                            // console.log(radioElements[i].checked);
                            return true;
                        }
                        // console.log(radioElements[i].checked);

                        return false;
                    }
                    
                    
                }

                if (lastClickedItemIndex !== null) {
                    dbLiList[lastClickedItemIndex].classList.toggle('red');
                    // toggleTrashImage(lastClickedItemIndex);
                    imgTrashList[lastClickedItemIndex].classList.toggle('hide');
                    lastClickedItemIndex = null;
                }

                const brElementCreate = document.createElement('br'),
                    dbLiElementCreate = document.createElement('li'),
                    imgTrashElementCreate = document.createElement('img');
                // hrElementCreate = document.createElement('hr');

                dbLiElementCreate.classList.add('dbList');
                imgTrashElementCreate.classList.add('hide');
                imgTrashElementCreate.classList.add('trash');
                imgTrashElementCreate.setAttribute('src', 'image/trash.png');
                imgTrashElementCreate.setAttribute('alt', 'image');

                dbLiElementCreate.textContent = `${FirstCharAttoUpper(inputNameFilmElem.value)}(${inputYearFilmElem.value})`;
                log(`Add to DB: <strong>${
                    FirstCharAttoUpper(inputNameFilmElem.value)
                }</strong>  <br>release year: <strong>${
                    inputYearFilmElem.value
                }</strong> <br>favorite value: <strong>${getFavoriteChecked()}</strong>`);
                outputFieldScroll();

                dbOl.prepend(brElementCreate);
                dbOl.prepend(dbLiElementCreate)

                dbLiList[0].append(imgTrashElementCreate);


                dbLiElementCreate.addEventListener('click', iventMovieDB());
                imgTrashElementCreate.addEventListener('click', movieDB.delFilm)
                
                
               
                if (Object.keys(movieDB.movies).includes(inputYearFilmElem.value)) {
                movieDB.movies[inputYearFilmElem.value][FirstCharAttoUpper(inputNameFilmElem.value)] = getFavoriteChecked();
                    
                } else {
                    movieDB.movies[inputYearFilmElem.value] = {};
                    movieDB.movies[inputYearFilmElem.value][FirstCharAttoUpper(inputNameFilmElem.value)] = getFavoriteChecked();
                } inputYearFilmElem.value = "";
                inputNameFilmElem.value = "";
                

            }
        } outputFieldScroll();
        radioElements.forEach(item=>{
            item.checked = false;
        });
        submitButElem.disabled = true;
        return this;
    },
    delFilm: function (e) {

        movieDB.movies[movieDB.getMovieYear(lastClickedItemIndex)] = delete movieDB.movies[movieDB[movieDB.getMovieYear(lastClickedItemIndex)]]
      
        log(`<span class='error'> Removed from DB:</span> <strong>${
            movieDB.getMovieName(lastClickedItemIndex)
        }</strong> `);
        outputFieldScroll();

    e.target.parentNode.nextElementSibling.remove(); //del br
        // console.dir(e.target.parentNode);
        
        e.target.parentNode.remove();// del li

        lastClickedItemIndex = null;

        

    },
    getMovieName: function (index) {
        return dbLiList[index].textContent.slice(0, dbLiList[index].textContent.length - 7);
    },
    getMovieYear: function (index) {
        return dbLiList[index].textContent.slice(dbLiList[index].textContent.length - 5, dbLiList[index].textContent.length - 1);

    }

};

radioElements.forEach(item=>{
    item.addEventListener('click', ()=>{
        submitButElem.disabled = false;
    });
})

function FirstCharAttoUpper(myString) {
    let firstLetter = myString.charAt(0).toUpperCase();
    let result = firstLetter + myString.slice(1);
    return result;
}
function isYear(input) { // проверяем, соответствует ли введенное значение регулярному выражению для года в формате YYYY
    let yearRegex = /^\d{4}$/;
    if (yearRegex.test(input)) {
        return input;
    } else {
        return false;
    }
}

let lastClickedItemIndex = null;




function iventMovieDB(){
const toggleTrashImage = (itemIndex) => {
    imgTrashList[itemIndex].classList.toggle('hide');
};

const hideLastClickedItemTrashImage = () => {
    if (lastClickedItemIndex !== null) {
        dbLiList[lastClickedItemIndex].classList.toggle('red');
        toggleTrashImage(lastClickedItemIndex);
        lastClickedItemIndex = null;
    }
};

function handleListItemClick(e){
    let itemIndex
    if(e.target.localName === 'li'){
        itemIndex = Array.from(dbLiList).indexOf(e.target);
        e.target.classList.toggle('red');
        console.log(e.target.localName);
        console.dir(e.target);
        console.dir(dbLiList);
        console.dir(Array.from(dbLiList));
        console.dir(itemIndex);
    }
    if(e.target.localName === 'img'){
        itemIndex = Array.from(dbLiList).indexOf(e.target.parentNode);
        console.log(e.target.localName);
        console.dir(e.target);
        console.dir(imgTrashList);
        console.dir(Array.from(imgTrashList));
        console.dir(itemIndex);


    }
    console.log(lastClickedItemIndex);
    if (itemIndex !== lastClickedItemIndex) {
        hideLastClickedItemTrashImage();
        toggleTrashImage(itemIndex);
        lastClickedItemIndex = itemIndex;

    } else {
        toggleTrashImage(itemIndex);
        lastClickedItemIndex = null;

    }
}
for (let item of dbLiList) {
    item.addEventListener('click', handleListItemClick);
}
}

iventMovieDB();




submitButElem.addEventListener('click', movieDB.addNewFilm);

for (const item of imgTrashList) {
    item.addEventListener('click', movieDB.delFilm)
}


document.addEventListener('DOMContentLoaded', function () {

    if (getBodyWidth <= 730) {
        dbFieldsetElem.style.width = `${
            getBodyWidth * 0.9 - 200
        }px`;
        customizeDBFieldsetElem.style.width = `${
            getBodyWidth * 0.9 - 200
        }px`;
        customizeElem.style.flexDirection = 'column';
        customizeElem.style.marginBottom = '10px';
        Array.from(customizeElem.children).forEach((item) => item.style.margin = '0 auto');
    }

    if (getBodyWidth <= 650) { // mobile
        dbFieldsetElem.style.width = `${
            getBodyWidth * 0.9
        }px`;
        customizeDBFieldsetElem.style.width = `${
            getBodyWidth * 0.9
        }px`;
        headerElem.style.flexDirection = 'column';
        headerSearch.style.width = `${getBodyWidth}px`;
        inputSearch.style.width = `${
            getBodyWidth / 2
        }px`;

        navUl.style.minHeight = 'auto';
        navUl.style.width = `${getBodyWidth}px`;
        navUl.style.alignItems = 'center';

        mainElem.style.flexDirection = 'column';

        filmElem.style.background = "url('./image/mars_mob.webp') center / cover no-repeat";
        filmElem.style.minWidth = '50px';
        filmElem.style.marginTop = '2px';
        wrapElem.style.width = `${getBodyWidth}px`;

        filmDescr.style.maxWidth = '640px';

        articleElem.style.flexDirection = 'row';
        articleElem.style.justifyContent = 'space-around'

    }

    if (getBodyWidth > 650 && getBodyWidth < 974) {
        // tablet
        h1Element.style.marginLeft = `-${
            getBodyWidth / 2 * 0.3
        }px`;
        wrapElem.style.minWidth = '444px';
        const calcWrapWidth = () => {
            const availableWidth = getBodyWidth - `${
                navMenu.clientWidth
            }` - 6;
            return `${availableWidth}px`;
        }
        const updateWidth = () => {
            let availableWidth = calcWrapWidth();
            wrapElem.style.width = (parseFloat(availableWidth)) + 'px';
            setTimeout(() => { // убираем баг лишних 15рх
                if (wrapElem.offsetTop !== navMenu.offsetTop) {
                    wrapElem.style.width = (parseFloat(availableWidth) - 15) + 'px';

                }
            }, 100);
        };

        window.addEventListener('load', updateWidth);

        // инициализация ширины при загрузке страницы
        updateWidth();

        headerSearch.style.width = `${
            getBodyWidth / 4
        }px`;

        formSearch.style.height = '100px';
        formSearch.style.width = `${
            getBodyWidth / 4
        }px`;

        inputSearch.style.width = `${
            getBodyWidth / 6
        }px`;

        mainElem.style.justifyContent = 'flex-start';

        wrapElem.style.marginLeft = '3px';

        articleElem.style.flexDirection = 'row';
        articleElem.style.width = `${getBodyWidth}px`;
        articleElem.style.marginTop = '3px';
        articleElem.style.justifyContent = 'space-around';

    }

    if (getBodyWidth >= 974) { // desktop
        h1Element.style.marginLeft = `-${
            getBodyWidth / 2 * 0.4
        }px`;

        const calcWrapWidth = () => {
            const availableWidth = getBodyWidth - `${
                navMenu.clientWidth + articleElem.clientWidth
            }` - 6;
            return `${availableWidth}px`;

        }

        const updateWidth = () => {
            let availableWidth = calcWrapWidth();
            wrapElem.style.width = (parseFloat(availableWidth) - 15) + 'px';
            setTimeout(() => { // убираем баг лишних 15рх
                if (wrapElem.offsetTop !== articleElem.offsetTop) {
                    availableWidth = (parseFloat(availableWidth) - 15) + 'px';
                    wrapElem.style.width = availableWidth;

                }
            }, 100);
            wrapElem.style.width = availableWidth;


        };

        window.addEventListener('load', updateWidth);

        // инициализация ширины при загрузке страницы
        updateWidth();
    }

    // // удаление рекламы что не влазит в стоку !!!!!!!!!! не пашет нормально доделать
    setTimeout(() => {
        if (getBodyWidth < 810 && getBodyWidth > 600) {
            articleElem.style.width = '599px';
            articleElem.style.margin = '3px auto';

        }
    }, 1000);


});
