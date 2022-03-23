<template>
  <div>
      <div style="display: flex; flex-wrap: wrap">
        <template v-if="heroList.length">
            <div 
                style="margin-left: 10px; width: 100px; heigth: 100px; border: solid black"
                v-for="hero in displayedList"
                :key="hero.id"
            > 
            <h6>{{hero.name}}</h6>                
                <div
                    style="background: blue; cursor: pointer; color: white; text-align: center" 
                    @click="editHero(hero.id)"
                >
                    EDIT
                </div>
                <img 
                :src="hero.thumbnail.path + '.' + hero.thumbnail.extension" 
                width="100%" 
                height="100px"
                >  
                <div
                    style="background: red; cursor: pointer; color: white; text-align: center" 
                    @click="deleteHero(hero.id)"
                >
                    DELETE
                </div>
            </div>
        </template> 
      </div>
     
      
    <div style="display: flex">
        <div @click="setPage(-1)">---</div>
        {{currentPage}}
        <div @click="setPage(1)">+++</div>
    </div>
    <div style="display: flex">
        <v-select :valule="limit" :items="[1, 5, 10, 20, 50]" @input="setLimit($event)"></v-select>
    </div>

    <input style="border: solid black" type="text" v-model="creation">
            <v-btn :color="'primary'" @click="createHero">CREATE</v-btn>

    <div style="display: flex; flex-wrap: wrap; margin-top: 100px; ">
        <div 
                style=" margin-left: 1px; width: 100px; heigth: 100px; border: solid black"
                :style="hero.isDisabled ?'filter: saturate(0)' : ''"
                v-for="hero in heroList"
                :key="hero.id + 'HELLO VUEJS'"
            > 
            <h6>{{hero.name}}</h6>                
                <div
                    style="background: blue; cursor: pointer; color: white; text-align: center" 
                    @click="editHero(hero.id)"
                >
                    EDIT
                </div>
                <img 
                :src="hero.thumbnail.path + '.' + hero.thumbnail.extension" 
                width="100%" 
                height="100px"
                >  
                <div
                    style="background: red; cursor: pointer; color: white; text-align: center" 
                    @click="deleteHero(hero.id)"
                >
                    DELETE
                </div>
            </div>
    </div>
      
  </div>
</template>

<script>
import marvelService from '../api/services/marvelAPI/marvelService'
export default {
    data() {
        return {
            creation: '',
            heroList: [],
            limit: 10, 
            offsetModifier: 0,
            currentPage: 1,
        }
    },
    computed: {
        redundancy() {
            const normal = []
            const notNormal = []
            this.heroList.forEach(hero => {
                if (normal.find(({id, name}) => name === hero.name && id === hero.id)) notNormal.push(hero.name)
                normal.push(hero)
                })
                if (notNormal.length) console.log('REDUNDANCY')
                return notNormal
        },

        displayedList() {
            console.log('displayedList')
            return this.validHeroList.slice((this.currentPage - 1) * this.limit, this.limit * this.currentPage );
        },
        validHeroList() {
            console.log('COUCOUCOUCO')
            return this.heroList.filter(({isDisabled}) => {
                            return !isDisabled
                        }).sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1)
        },
        deletedHeroes() {
            return this.heroList.filter(({isDisabled}) => isDisabled)
        },


    },

    created() {
        if(this.isLimitReached()) this.getHeroes();
    },
    methods: {
        createHero() {
            console.log('CREATE', this.creation)
            this.heroList.push({id: Math.random() + '' + Math.random(), name: this.creation, thumbnail:{path:'', extention: ''} })
            this.cration = '';
        },
        isLimitReached() {
            console.log('isLimitReached => ', {val : this.validHeroList.length / this.limit <= this.currentPage -1, calcul: this.validHeroList.length / this.limit, length: this.validHeroList.length, limit: this.limit, page: this.currentPage, pageValue: this.currentPage -1 })
            return this.validHeroList.length / this.limit <= this.currentPage;
        },
        editHero(myId) {
            const index = this.heroList.findIndex(({id}) => myId === id);
            this.heroList.splice(index, 1, {...this.heroList[index], name: 'TOTO', isEdited: true}) 
        },
        setLimit(val) {
            this.limit = val;
            if (this.isLimitReached()) {
                if ((+(this.currentPage - (this.validHeroList.length / this.limit)).toFixed(1) * this.limit) >= 100) {
                    this.setPage(-(this.currentPage - 1))
                } else {
                    this.getHeroes();
                }
            }
        },
     
        deleteHero(myId) {
            const index = this.heroList.findIndex(({id}) => myId === id);
            console.log('myId => ', {myId, hero: this.heroList[index]})
            this.heroList.splice(index, 1, {...this.heroList[index], isDisabled: true}) 
            if (this.isLimitReached()) this.getHeroes();
        },
        setPage(move) {
            const newPage = this.currentPage + move;
            this.currentPage = newPage > 0 ? newPage : this.currentPage;
            if (this.isLimitReached()) this.getHeroes();
        },
        getHeroes(counter = null, itteration = 0) {
            console.log('------------- LIMIT REACHED -----------')
            // console.log('limit => ', {page: this.currentPage, length: this.validHeroList.length, limit: this.limit})
            const limit = this.heroList.length
            ?  +(this.currentPage - (this.validHeroList.length / this.limit)).toFixed(1) * this.limit
            : this.limit

            console.log('QUERYS => ', {limit: counter || limit, offset: this.heroList.length + this.offsetModifier} )
            marvelService.getAllHeroes({limit: counter || limit, offset: this.heroList.length + this.offsetModifier,})
            .then(res => {
                const data = res.data.data.results
                // console.log('RES => ', data)
                let counter = 0;
                data.forEach(({id}, i) => {
                    const foundHero = this.deletedHeroes.find(hero => hero.id === id)
                    if (foundHero) {
                        if (foundHero.isDisabled) {
                            counter++;
                        }
                    } else {
                        this.heroList.push(data[i])
                    }
                });
                this.offsetModifier += counter
                if (counter) {
                    if (itteration === 10) console.log('NOOOOOOPE')
                    // else this.getHeroes(counter, itteration + 1);
                    console.log('Recursive')
                }
            })
        }

    },
}
</script>

<style>

</style>