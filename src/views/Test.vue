<template>
  <div>
      <div style="display: flex; flex-wrap: wrap">
        <template v-if="heroList.length">
            <div 
                style="margin-left: 10px; width: 100px; heigth: 100px; border: solid black"
                v-for="hero in displayedList"
                :key="hero.id"
            > 
            <div
                    style="cursor: pointer; color: white; text-align: center" 
                    :style="hero.isFav ? 'background: green; ' : 'background: grey' "
                    @click="addHero(hero.id)"
                >
                    FAV
                </div>
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
        <v-btn @click="setPage(-1)">-</v-btn>
        <b>
            {{currentPage}}
        </b>
        <v-btn @click="setPage(1)">+</v-btn>
    </div>
    <div style="display: flex">
        <v-select :valule="limit" :items="[1, 5, 10, 20, 50]" @input="setLimit($event)"></v-select>
    </div>

    <input style="border: solid black" type="text" v-model="creation">
            <v-btn :color="'primary'" @click="createHero">CREATE</v-btn>
<br>
    <input style="border: solid black" type="text" v-model="search">
            <v-btn :color="'primary'" @click="getHeroes(true)">Search</v-btn>

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
            lockDeltion: false,
            search: ''
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
                return notNormal
        },

        displayedList() {
            return this.validHeroList.filter(({name}) => name.toUpperCase().includes(this.search.toUpperCase())).slice((this.currentPage - 1) * this.limit, this.limit * this.currentPage );
        },
        validHeroList() {
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
        // SYSTEM BRAIN
        isLimitReached() {
        return this.validHeroList.length / this.limit <= this.currentPage;
        },
        createHero() {
            this.heroList.push({id: Math.random() + '' + Math.random(), isCreated: true, name: this.creation, thumbnail:{path:'', extention: ''} })
            this.cration = '';
        },
        addHero(myId) {
            const index = this.heroList.findIndex(({id}) => myId === id);
            this.heroList.splice(index, 1, {...this.heroList[index], isFav: true}) 
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
            if (this.lockDeltion) return // Prevent spamming that might be too fast  & duplicate heros
            const index = this.heroList.findIndex(({id}) => myId === id);
            this.heroList.splice(index, 1, {...this.heroList[index], isDisabled: true}) 
            if (this.isLimitReached()) {
                this.lockDeltion = true;
                this.getHeroes();
            }
        },
        debounceDeletion() { 
            this.lockDeltion = true;
        },
        setPage(move) {
            const newPage = this.currentPage + move;
            this.currentPage = newPage > 0 ? newPage : this.currentPage;
            if (this.isLimitReached()) this.getHeroes();
        },
        getHeroes(reset = false, counter = null, itteration = 0) {
            console.debug('HALLO')
            const limit = this.heroList.length && !reset
            ?  +(this.currentPage - (this.validHeroList.length / this.limit)).toFixed(1) * this.limit
            : this.limit
            console.log('limit query => ', limit)
            if (limit === 0) return; 
            if (reset) this.heroList = this.heroList.filter(({isDisabled, isFav, isCreated}) => isDisabled || isFav || isCreated)
            marvelService.getAllHeroes({nameStartsWith: this.search, limit: counter || limit, offset: this.heroList.filter(({isCreated}) => !isCreated ).length -  + this.offsetModifier,})
            .then(res => {
                const data = res.data.data.results
                data.forEach(({id}, i) => {
                    const foundHero = this.deletedHeroes.find(hero => hero.id === id)
                    if (foundHero) {
                        if (foundHero.isDisabled) {
                            this.offsetModifier++;
                        }
                    } else {
                        this.heroList.push(data[i])
                    }
                    if (this.lockDeltion) this.lockDeltion = false;
                });
                if (counter) { // MEME PAS BESOIN !
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