
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
              .then(({indexToRemove, localStorageHeroes}) => {
                  console.log('indexToremove => ', indexToRemove)
                  localStorageHeroes.splice(indexToRemove, 1);
                  localStorage.setItem('savedHeroes', JSON.stringify(localStorageHeroes));
                  resolve(localStorageHeroes);
              });
        });
    },
    findHeroIndexInLocalStorage(idHero) {
        return new Promise((resolve) => {
            return this.fetchHeroes()
                .then(localStorageHeroes => {
                    const indexToRemove = localStorageHeroes
                        .map(hero => {
                            console.log('Hero map => ', hero.id)
                            return hero.id
                        })
                        .indexOf(idHero);
                    console.log('indexToRemove in findHero => ', indexToRemove)
                    resolve({indexToRemove, localStorageHeroes});
                });
        })
    }
}