
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
                    hero.savedDate = new Date();
                    hero.edited = false;
                    localStorageHeroes.push(hero);
                    localStorage.setItem('savedHeroes', JSON.stringify(localStorageHeroes));
                    resolve('Successfully Added');
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
                    } else {
                        reject('hero not found');
                    }
            })
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
    }
}