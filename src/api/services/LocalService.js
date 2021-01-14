
export default {
    fetchHeroes() {
        return new Promise(resolve => {
            resolve(JSON.parse(localStorage.getItem('savedHeroes')))
            const assign = [];
            JSON.parse(localStorage.getItem('savedHeroes'))
                .forEach(localHero => {
                    assign.push(Object.assign({}, localHero));
                })
        })
    },
    isHeroInLocalStorage(idHero) {
        return this.fetchHeroes()
            .then(localStorageHeroes => {
                return !!localStorageHeroes.find(registeredHero => {
                    return registeredHero.id === idHero;
                });
            });
    },
    addHero(hero) {
        return new Promise((resolve) => {
            this.fetchHeroes()
                .then(localStorageHeroes => {
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
    getOneLocalStorageHero(idHero) {

        return new Promise((resolve, reject) => {
            return this.findHeroIndexInLocalStorage(idHero)
                .then(({index, localStorageHeroes}) => {
                    if(index > -1) {
                        resolve(localStorageHeroes[index]);
                    }
                })
                .catch(() => {
                    reject()
                });
        })
    },
    findHeroIndexInLocalStorage(idHero) {
        return new Promise((resolve) => {
            return this.fetchHeroes()
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
                    if(index > -1) {
                        console.log(localStorageHeroes[index])
                        localStorageHeroes[index] = hero;
                        localStorage.setItem('savedHeroes', JSON.stringify(localStorageHeroes));
                        resolve(hero);
                    }
                })
        })
    }
}