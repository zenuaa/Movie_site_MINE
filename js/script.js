<<<<<<< HEAD
'use strict';
// do rebase
=======
'closeYear strict';
>>>>>>> d207133 (v 1.1)

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


    // dbOl = getElem('.db ol'),
    dbLiList = document.getElementsByClassName('dbList'),
    dbFieldsetElem = getElem('.db fieldset'),

    customizeElem = getElem('.customize'),
    customizeDBFieldsetElem = getElem('.customizeDB fieldset'),

    articleElem = getElem('article'),
    adElements = getElemS('.ad'),
    ad_arr = [];

let lastClickedElem = null;

adElements.forEach(item => {
    ad_arr.push(item.children[0])
})

const log = function (message) {
    output.insertAdjacentHTML('beforeend', `<span> ${message} </span><br>`)
}

const outputFieldScroll = function () {
    let getHeight = 0;
    getHeight += outputFieldElem.offsetHeight;

    outputFieldElem.style.height = `${getHeight}px`;
    outputFieldElem.scrollTop = outputFieldElem.scrollHeight;
    return getHeight;
}
submitButElem.disabled = true;


const movieDB = {
    movies: {
        2018: {
            "Black Panther": true,
            "Avengers: Infinity War": true,
            "A Star is Born": false,
            "A Quiet Place": true,
            "The Shape of Water": false
        },
        2020: {
            "Another Round": true,
            "The Father": false
        },

        2019: {
            "Portrait of a Lady on Fire": true,
            "Pain and Glory": false
        }
    },
    initialMovieDB: () => {
        movieDB.movies.keys()
    },
    addNewFilm: function (e) {


        if (inputNameFilmElem.value.trim() === "") {
            e.preventDefault();
            log("<span class='error'>Error:</span> Film name input - is empty..");
            outputFieldScroll();

            console.warn("Incorrect input: Incorrect film name input..");
            // throw new Error("Incorrect input: Incorrect film name input..");
        } else {
            if (inputYearFilmElem.value.trim() === "" || !isYear(inputYearFilmElem.value) || inputYearFilmElem.value < 1800) {
                e.preventDefault();
                log("<span class='error'>Error:</span> Film year input - is empty or input.value incorrect..");
                outputFieldScroll();

                // console.warn("Incorrect input: Incorrect film year input..");
                //     throw new Error("Incorrect input: Incorrect film year input..");
            } else {
                e.stopPropagation();
                e.preventDefault();
                const getFavoriteChecked = () => {
                    for (let i = 0; i < radioElements.length; i++) {
                        if (radioElements[i].checked === true) { // console.log(radioElements[i].checked);
                            return true;
                        }
                        // console.log(radioElements[i].checked);

                        return false;
                    }
                }
                console.log(movieDB.movies);
                
                if (Object.keys(movieDB.movies).includes(inputYearFilmElem.value)) {
                    movieDB.movies[inputYearFilmElem.value][FirstCharAttoUpper(inputNameFilmElem.value)] = getFavoriteChecked();

                } else {
                    movieDB.movies[inputYearFilmElem.value] = {};
                    movieDB.movies[inputYearFilmElem.value][FirstCharAttoUpper(inputNameFilmElem.value)] = getFavoriteChecked();
                } 
                

                console.log(movieDB.movies);
                
                const wrapElemCreate = document.createElement('div'),
                        subListElemCreate = document.createElement('ol'),
                        liListItemCreate = document.createElement('li'),
                        trashElemCreate = document.createElement('img'),
                        starElemCreate = document.createElement('img'),
                        movieDBLinkCreate = document.createElement('a');


                        wrapElemCreate.classList.add('wrapsubList');

                        subListElemCreate.classList.add('subList');
                
                        liListItemCreate.classList.add('liList');
                
                        trashElemCreate.classList.add('trash', 'hide');
                        trashElemCreate.setAttribute('src', './image/trash.png')
                        trashElemCreate.setAttribute('alt', 'trash');
                
                        starElemCreate.classList.add('star');
                        starElemCreate.setAttribute('src', './image/Star.svg')
                        starElemCreate.setAttribute('alt', 'star')
                
                        movieDBLinkCreate.classList.add('filmName');
                        movieDBLinkCreate.setAttribute('href', '#')
                        movieDBLinkCreate.setAttribute('alt', 'filmName')
            
                        // (${inputYearFilmElem.value})

                        movieDBLinkCreate.textContent = `${FirstCharAttoUpper(inputNameFilmElem.value)}`;

                        log(`Add to DB: <strong>${
                            FirstCharAttoUpper(inputNameFilmElem.value)
                        }</strong>  <br>release year: <strong>${
                            inputYearFilmElem.value
                        }</strong> <br>favorite value: <strong>${
                            getFavoriteChecked()
                        }</strong>`);
                        outputFieldScroll();


                        
                        const wrapsubList = getElemS('.wrapsubList');// get open yearList
                        console.log(wrapsubList);
                        let parentCurentYear;
                        if(wrapsubList.length > 0){
                            wrapsubList.forEach((item)=>{
                            if(item.dataset.year === inputYearFilmElem.value){
                                parentCurentYear = item.parentNode;
                                let plusMinusElem = parentCurentYear.firstElementChild;
                                let event = new MouseEvent("click", {
                                bubbles: true,
                                cancelable: true,
                                view: window
                                });
                                plusMinusElem.dispatchEvent(event); // Имитация клика по элементу ЗАКРЫВАЕМ
                                plusMinusElem.textContent = inputYearFilmElem;
                                plusMinusElem.dispatchEvent(event); // Имитация клика по элементу Открываем
                            }
                            
                        })
                                                    
                        }
                       
            
                    }
        }
        outputFieldScroll();
        radioElements.forEach(item => {
            item.checked = false;
        });
        submitButElem.disabled = true;
        inputYearFilmElem.value = "";
        inputNameFilmElem.value = "";

        return this;
    },
    delFilm: function () {
        movieDB.movies
        // console.dir(lastClickedElem.parentNode.parentNode.childElementCount)
        if (lastClickedElem.parentNode.parentNode.childElementCount === 1) {
            lastClickedElem.parentNode.parentNode.parentNode.parentNode.remove();
        }

        delete movieDB.movies[movieDB.getMovieYear()][movieDB.getMovieName()];
        lastClickedElem.parentNode.remove();

        log(`<span class='error'> Removed from DB:</span> <strong>${movieDB.getMovieName()
            }</strong> `);
        outputFieldScroll();

        lastClickedElem = null;


    },
    getMovieName: function () {
        return lastClickedElem.parentNode.textContent
    },
    getMovieYear: function () {
        return lastClickedElem.parentNode.parentNode.parentNode.parentNode.querySelector('.activeYear').textContent;
    }

};


// EXPERIMENT

const movieDBElement = getElem('#movieDB'),
    yearList = Object.keys(movieDB.movies);

function createListYear() { // вывод списка по годам
    yearList.forEach((year) => {

        const yearListElementCreate = document.createElement('li'),
                imgPlusElementCreate = document.createElement('img'),
                yearElem = document.createElement('p');

        yearListElementCreate.classList.add('yearList');


        imgPlusElementCreate.setAttribute('src', './image/plus.png');
        imgPlusElementCreate.setAttribute('alt', 'plus');

        // yearElem
        yearElem.style.display = 'inline';

        movieDBElement.prepend(yearListElementCreate);
        yearListElementCreate.prepend(imgPlusElementCreate);
        yearListElementCreate.firstElementChild.after(yearElem);

        yearElem.textContent = year;

    })
    // const yearItem = getElemS('.yearList');

}
createListYear();

// const yearListElement = getElem('.yearList');


movieDBElement.addEventListener('click', (e) => {
    console.log(e.target);

    const wrapElemCreate = document.createElement('div'),
        subListElemCreate = document.createElement('ol'),
        liListItemCreate = document.createElement('li'),
        trashElemCreate = document.createElement('img'),
        starElemCreate = document.createElement('img'),
        movieDBLinkCreate = document.createElement('a'),

        imgTrashList = document.getElementsByClassName('trash');


    if (e.target.getAttribute('alt') === 'plus') { // развернуть список

        wrapElemCreate.classList.add('wrapsubList');


        subListElemCreate.classList.add('subList');

        liListItemCreate.classList.add('liList');

        trashElemCreate.classList.add('trash', 'hide');
        trashElemCreate.setAttribute('src', './image/trash.png')
        trashElemCreate.setAttribute('alt', 'trash');

        starElemCreate.classList.add('star');
        starElemCreate.setAttribute('src', './image/Star.svg')
        starElemCreate.setAttribute('alt', 'star')

        movieDBLinkCreate.classList.add('filmName');
        movieDBLinkCreate.setAttribute('href', '#')
        movieDBLinkCreate.setAttribute('alt', 'filmName')
        
        e.target.parentNode.append(wrapElemCreate);
        wrapElemCreate.append(subListElemCreate);

        wrapElemCreate.dataset.year = `${wrapElemCreate.previousElementSibling.textContent}`


        e.target.parentNode.children[1].classList.toggle('activeYear');

        const addMovieElem = () => {
            const arr = Object.entries(movieDB.movies[e.target.nextElementSibling.textContent]);
            arr.sort((a, b) => {
                const warNameA = a[0];
                const warNameB = b[0];
                // Compare the war names
                if (warNameA < warNameB) {
                    return -1; // a should come before b
                }
                if (warNameA > warNameB) {
                    return 1; // b should come before a
                }
                return 0; // a and b are equal
            });

            arr.forEach((item) => {
                const liListItemCreate = document.createElement('li');
                liListItemCreate.classList.add('liList');

                movieDBLinkCreate.textContent = `${item[0]
                    }`
                liListItemCreate.prepend(trashElemCreate.cloneNode(true));

                if (item[1] === true) { // insert star

                    liListItemCreate.prepend(starElemCreate.cloneNode(true));
                }

                liListItemCreate.append(movieDBLinkCreate);
                subListElemCreate.append(liListItemCreate.cloneNode(true));
            });

        };
        addMovieElem();

        e.target.setAttribute('src', './image/minus.png');
        e.target.setAttribute('alt', 'minus');

        // e.target.nextElementSibling.classList.toggle('hide');


        const allLinks = e.target.parentNode.querySelectorAll('.filmName');
        // console.log(allLinks);

        for (const item of allLinks) {
            const activMovieElem = document.getElementsByClassName('activMovie');

            item.addEventListener('click', (e) => {
                if (lastClickedElem != null) {
                    lastClickedElem.classList.toggle('activMovie'); // off
                    lastClickedElem.previousElementSibling.classList.toggle('hide'); // hide trash
                    if (lastClickedElem.previousElementSibling.previousElementSibling) {                        
                        lastClickedElem.previousElementSibling.previousElementSibling.classList.toggle('hide'); // show star if exist
                    }
                    lastClickedElem = null;
                }
                e.preventDefault();
                e.stopPropagation();
                // console.log(e.target);
                e.target.previousElementSibling.classList.toggle('hide'); // show trash
                if (e.target.previousElementSibling.previousElementSibling) {                    
                    e.target.previousElementSibling.previousElementSibling.classList.toggle('hide'); // hide star
                }
                e.target.classList.toggle('activMovie'); // выделяем фильм
                lastClickedElem = activMovieElem[0];
                // console.log(lastClickedElem);

            });

        }
        for (const item of imgTrashList) {
            item.addEventListener('click', movieDB.delFilm, {
                once: true
            })
        }
    } else {
        if (e.target.getAttribute('alt') === 'minus') { // свернуть список
            e.target.setAttribute('src', './image/plus.png')
            e.target.setAttribute('alt', 'plus')
            e.target.parentNode.lastElementChild.remove();
            console.log(e.target.parentNode.lastElementChild);
            
            console.log(e.target.parentNode);
            
            e.target.parentNode.children[1].classList.toggle('activeYear');


        }
    }
})


// EXPERIMENT END

radioElements.forEach(item => {
    item.addEventListener('click', () => {
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

submitButElem.addEventListener('click', movieDB.addNewFilm);


// crossbrowser
document.addEventListener('DOMContentLoaded', function () {

    if (getBodyWidth <= 730) {
        dbFieldsetElem.style.width = `${getBodyWidth * 0.9 - 200
            }px`;
        customizeDBFieldsetElem.style.width = `${getBodyWidth * 0.9 - 200
            }px`;
        customizeElem.style.flexDirection = 'column';
        customizeElem.style.marginBottom = '10px';
        Array.from(customizeElem.children).forEach((item) => item.style.margin = '0 auto');
    }

    if (getBodyWidth <= 650) { // mobile
        dbFieldsetElem.style.width = `${getBodyWidth * 0.9
            }px`;
        customizeDBFieldsetElem.style.width = `${getBodyWidth * 0.9
            }px`;
        headerElem.style.flexDirection = 'column';
        headerSearch.style.width = `${getBodyWidth}px`;
        inputSearch.style.width = `${getBodyWidth / 2
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

    if (getBodyWidth > 650 && getBodyWidth < 974) { // tablet
        h1Element.style.marginLeft = `-${getBodyWidth / 2 * 0.3
            }px`;
        wrapElem.style.minWidth = '444px';
        const calcWrapWidth = () => {
            const availableWidth = getBodyWidth - `${navMenu.clientWidth
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

        headerSearch.style.width = `${getBodyWidth / 4
            }px`;

        formSearch.style.height = '100px';
        formSearch.style.width = `${getBodyWidth / 4
            }px`;

        inputSearch.style.width = `${getBodyWidth / 6
            }px`;

        mainElem.style.justifyContent = 'flex-start';

        wrapElem.style.marginLeft = '3px';

        articleElem.style.flexDirection = 'row';
        articleElem.style.width = `${getBodyWidth}px`;
        articleElem.style.marginTop = '3px';
        articleElem.style.justifyContent = 'space-around';

    }

    if (getBodyWidth >= 974) { // desktop
        h1Element.style.marginLeft = `-${getBodyWidth / 2 * 0.4
            }px`;

        const calcWrapWidth = () => {
            const availableWidth = getBodyWidth - `${navMenu.clientWidth + articleElem.clientWidth
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