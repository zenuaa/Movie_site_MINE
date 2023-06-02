
                            if (lastClickedElem !== null) {
                                dbLiList[lastClickedElem].classList.toggle('red');
                                imgTrashList[lastClickedElem].classList.toggle('hide');
                                if (dbLiList[lastClickedElem].children[0].classList.contains('star')) {
                                    dbLiList[lastClickedElem].children[0].classList.toggle('hide')
                                }
                                lastClickedElem = null;
                            }

                            const brElementCreate = document.createElement('br'),
                                dbLiElementCreate = document.createElement('li'),
                                imgTrashElementCreate = document.createElement('img'),
                                imgStarElementCreate = document.createElement('img');

                            dbLiElementCreate.classList.add('dbList');
                            imgTrashElementCreate.classList.add('hide');
                            imgTrashElementCreate.classList.add('trash');
                            imgTrashElementCreate.setAttribute('src', 'image/trash.png');
                            imgTrashElementCreate.setAttribute('alt', 'image');

                            imgStarElementCreate.classList.add('star');
                            imgStarElementCreate.setAttribute('src', 'image/Star.svg');
                            imgStarElementCreate.setAttribute('alt', 'star');

                            dbLiElementCreate.textContent = `${
                                FirstCharAttoUpper(inputNameFilmElem.value)
                            } (${
                                inputYearFilmElem.value
                            })`;
                            log(`Add to DB: <strong>${
                                FirstCharAttoUpper(inputNameFilmElem.value)
                            }</strong>  <br>release year: <strong>${
                                inputYearFilmElem.value
                            }</strong> <br>favorite value: <strong>${
                                getFavoriteChecked()
                            }</strong>`);
                            outputFieldScroll();

                            dbOl.prepend(brElementCreate);
                            dbOl.prepend(dbLiElementCreate)

                            if (getFavoriteChecked() === true) {
                                dbLiList[0].prepend(imgStarElementCreate);
                            }


                            dbLiList[0].append(imgTrashElementCreate);


                            dbLiElementCreate.addEventListener('click', clickToLi);
                            imgTrashElementCreate.addEventListener('click', movieDB.delFilm, {once: true})


                            if (Object.keys(movieDB.movies).includes(inputYearFilmElem.value)) {
                                movieDB.movies[inputYearFilmElem.value][FirstCharAttoUpper(inputNameFilmElem.value)] = getFavoriteChecked();

                            } else {
                                movieDB.movies[inputYearFilmElem.value] = {};
                                movieDB.movies[inputYearFilmElem.value][FirstCharAttoUpper(inputNameFilmElem.value)] = getFavoriteChecked();
                            } inputYearFilmElem.value = "";
                            inputNameFilmElem.value = "";
