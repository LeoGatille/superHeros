function orderHeroes(heroList, orderBy) {
    switch (orderBy) {
        case 'name' :
            console.log('Case name')
            return heroList.sort((a, b) => {
                let textA = a.name.toUpperCase();
                let textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        case '-name' :
            return heroList.sort((a, b) => {
                let textA = a.name.toUpperCase();
                let textB = b.name.toUpperCase();
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            });
        case 'modified' :
            console.log('Case date')
            return heroList.sort((a, b) => {
                return new Date(a.savedDate).getTime() - new Date(b.savedDate).getTime()
            });
        case '-modified' :
            console.log('Case reversed date')
            return heroList.sort((a, b) => {
                return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime()
            });

    }
}

function filterHeroes(heroList, limit, filter) {
    const filteredList = [];
    heroList.forEach((hero, i) => {
        if ((i + 1) <= limit) {
            if (hero.name.toLowerCase().startsWith(filter.toLowerCase())) {
                filteredList.push(hero);
            }
        }
    });
    return filteredList;
}

function getLocalStorage() {
    return new Promise(resolve => {
        resolve(JSON.parse(localStorage.getItem('savedHeroes')))
    });
}

export default {
    fetchHeroes(name, limit, orderBy) {
        return new Promise(resolve => {
            const localHeroes = JSON.parse(localStorage.getItem('savedHeroes'));
            resolve(orderHeroes(filterHeroes(localHeroes, limit, name), orderBy))
        })
    },
    addHero(hero) {
        return new Promise((resolve) => {
            getLocalStorage()
                .then(localStorageHeroes => {
                    console.log('WTF LOCAL', localStorageHeroes)
                    localStorageHeroes.push(hero);
                    localStorage.setItem('savedHeroes', JSON.stringify(localStorageHeroes));
                    resolve(hero);
                });
        });
    },
    removeHero(idHero) {
        return new Promise((resolve) => {
            this.findHeroIndexInLocalStorage(idHero)
                .then(({index, localStorageHeroes}) => {
                    localStorageHeroes.splice(index, 1);
                    localStorage.setItem('savedHeroes', JSON.stringify(localStorageHeroes));
                    resolve(localStorageHeroes);
                });
        });
    },
    findHeroIndexInLocalStorage(idHero) {
        return new Promise((resolve) => {
            return getLocalStorage()
                .then(localStorageHeroes => {
                    const index = localStorageHeroes
                        .map(hero => {
                            return hero.id
                        })
                        .indexOf(idHero);
                    resolve({index, localStorageHeroes});
                });
        })
    },
    editHero(hero) {
        return new Promise((resolve) => {
            this.findHeroIndexInLocalStorage(hero.id)
                .then(({index, localStorageHeroes}) => {
                    if (index > -1) {
                        localStorageHeroes[index] = hero;
                        localStorage.setItem('savedHeroes', JSON.stringify(localStorageHeroes));
                        resolve(hero);
                    } else {
                        console.log('FAILED INDEX')
                    }
                })
        })
    }
    // isHeroInLocalStorage(idHero) {
    //     return this.fetchHeroes()
    //         .then(localStorageHeroes => {
    //             return !!localStorageHeroes.find(registeredHero => {
    //                 return registeredHero.id === idHero;
    //             });
    //         });
    // },
    // getOneLocalStorageHero(idHero) {
    //     return new Promise((resolve, reject) => {
    //         return this.findHeroIndexInLocalStorage(idHero)
    //             .then(({index, localStorageHeroes}) => {
    //                 if (index > -1) {
    //                     resolve(localStorageHeroes[index]);
    //                 }
    //             })
    //             .catch(() => {
    //                 reject()
    //             });
    //     })
    // },
}