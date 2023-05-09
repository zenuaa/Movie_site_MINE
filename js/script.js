/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

document.addEventListener('DOMContentLoaded', function () {
    const getBodyWidth = document.body.clientWidth;
    const getElem = (id) => {
        const elem = document.querySelector(id);
        return elem;
    };
    const headerElement = getElem('header'),
        headerSearch = getElem('.header_search'),
        formSearch = getElem('.form_search'),
        inputSearch = getElem('#input_search'),
        h1Element = getElem('h1'),

        mainElement = getElem('main'),
        navMenu = getElem('.nav_menu'),
        navUl = getElem('nav ul'),
        wrapElement = getElem('.wrap'),
        filmElement = getElem('.film'),
        filmDescr = getElem('.film_descr'),
        
        articleElement = getElem('article'),
        adElements = document.querySelectorAll('.ad'),
        ad_arr = [];

    adElements.forEach(item => {
        ad_arr.push(item.children[0])
    })

    if (getBodyWidth <= 650) { // mobile
        
        headerElement.style.flexDirection = 'column';
        headerSearch.style.width = `${getBodyWidth}px`;
        inputSearch.style.width = `${getBodyWidth / 2}px`;

        navUl.style.minHeight = 'auto';
        navUl.style.width = `${getBodyWidth}px`;
        navUl.style.alignItems = 'center';
        
        mainElement.style.flexDirection = 'column';

        filmElement.style.background = "url('./image/mars_mob.webp') center / cover no-repeat";
        filmElement.style.minWidth = '50px';
        filmElement.style.marginTop = '2px';
        // filmElement.style.width = `${getBodyWidth}px`;
        wrapElement.style.width = `${getBodyWidth}px`;

        filmDescr.style.maxWidth = '640px';

        articleElement.style.flexDirection = 'row';
        articleElement.style.justifyContent = 'space-around'

    }

    if (getBodyWidth > 650 && getBodyWidth < 974) { //tablet
        h1Element.style.marginLeft = `-${getBodyWidth / 2 * 0.3}px`;
        // filmElement.style.minWidth = '444px';
        wrapElement.style.minWidth = '444px';
        const calcWrapWidth = () => {
            const availableWidth = getBodyWidth - `${navMenu.clientWidth}` - 6;
            return `${availableWidth}px`;
        }
        const updateWidth = () => {
            let availableWidth = calcWrapWidth();
            // filmElement.style.width = (parseFloat(availableWidth)) + 'px';
            wrapElement.style.width = (parseFloat(availableWidth)) + 'px';
            setTimeout(() => {      //убираем баг лишних 15рх
                if (wrapElement.offsetTop !== navMenu.offsetTop) {
                    // filmElement.style.width = (parseFloat(availableWidth) - 15) + 'px';
                    wrapElement.style.width = (parseFloat(availableWidth) - 15) + 'px';

                }
            }, 100);
        };

        window.addEventListener('load', updateWidth);

        // инициализация ширины при загрузке страницы
        updateWidth();
        
        headerSearch.style.width = `${getBodyWidth / 4}px`;

        formSearch.style.height = '100px';
        formSearch.style.width = `${getBodyWidth / 4}px`;
        
        inputSearch.style.width = `${getBodyWidth / 6}px`;

        mainElement.style.justifyContent = 'flex-start';

        wrapElement.style.marginLeft = '3px';

        articleElement.style.flexDirection = 'row';
        articleElement.style.width = `${getBodyWidth}px`;
        articleElement.style.marginTop = '3px';
        articleElement.style.justifyContent = 'space-around';

    }

    if (getBodyWidth >= 974) { //desktop
        h1Element.style.marginLeft = `-${getBodyWidth / 2 * 0.4}px`;

        const calcWrapWidth = () => {
            const availableWidth = getBodyWidth - `${navMenu.clientWidth + articleElement.clientWidth}` - 6;
            return `${availableWidth}px`;

        }

        const updateWidth = () => {
            let availableWidth = calcWrapWidth();
            // filmElement.style.width = (parseFloat(availableWidth) - 15) + 'px';
            wrapElement.style.width = (parseFloat(availableWidth) - 15) + 'px';
            setTimeout(() => {      //убираем баг лишних 15рх
                if (wrapElement.offsetTop !== articleElement.offsetTop) {
                    availableWidth = (parseFloat(availableWidth) - 15) + 'px';
                    // filmElement.style.width = availableWidth;
                    wrapElement.style.width = availableWidth;

                }
            }, 100);
            // filmElement.style.width = availableWidth;
            wrapElement.style.width = availableWidth;


        };

        window.addEventListener('load', updateWidth);

        // инициализация ширины при загрузке страницы
        updateWidth();
    }

    // // удаление рекламы что не влазит в стоку !!!!!!!!!! не пашет нормально доделать
    setTimeout(() => {
        if (getBodyWidth < 810 && getBodyWidth > 600) {
            articleElement.style.width = '599px';
            articleElement.style.margin = '3px auto';


        }
    }, 1000);


});

