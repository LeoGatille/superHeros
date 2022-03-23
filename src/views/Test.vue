<template>
  <div>
      <div style="display: flex">
        <template v-if="heroList.length">
            <div style="margin-left: 10px"
                v-for="(hero, i) in displayedList"
                :key="hero.id + i"
                @click="deleteHero(hero.id)"
            > 
            <!-- <h4>{{hero.name}}</h4> -->
            <p>{{i}}</p>
                <img :src="hero.thumbnail.path + '.' + hero.thumbnail.extension" width="50px" height="50px">
            </div>
        </template> 
      </div>
     
      
    <div style="display: flex">
        <div @click="setPage(-1)">---</div>
        {{currentPage}}
        <div @click="setPage(1)">+++</div>
    </div>
    <div style="display: flex">
        <v-select :valule="limit" :items="[1, 5, 10, 50]" @input="setLimit($event)"></v-select>
    </div>
      
  </div>
</template>

<script>
import marvelService from '../api/services/marvelAPI/marvelService'
export default {
    data() {
        return {
            heroList: [],
            limit: 10, 
            offsetModifier: 0,
            currentPage: 1,
        }
    },
    computed: {
        displayedList() {
            console.log('displayedList => ',(this.currentPage - 1) *this.limit,( this.limit * this.currentPage)  )
            return this.validHeroList.slice((this.currentPage - 1) * this.limit, this.limit * this.currentPage );
        },
        validHeroList() {
            return this.heroList.filter(({isDisabled}) => {
                            return !isDisabled
                        })
        },
        deletedHeroes() {
            return this.heroList.filter(({isDisabled}) => isDisabled)
        }
    },

    created() {
        this.getHeroes()
    },
    methods: {
        setLimit(val) {
            this.limit = val;
            if (this.isLimitReached) this.getHeroes();
        },
        isLimitReached() {
            return this.displayedList.length / this.limit <= this.currentPage;
        },
        deleteHero(myId) {
            const index = this.heroList.findIndex(({id}) => myId === id);
            this.heroList.splice(index, 1, {...this.heroList[index], isDisabled: true}) 
            if (this.isLimitReached) this.getHeroes();
        },
        setPage(move) {
            const newPage = this.currentPage + move;
            this.currentPage = newPage > 0 ? newPage : this.currentPage;
            if (this.isLimitReached) this.getHeroes();
        },
        getHeroes(counter = null, itteration = 0) {
            console.log('limit => ', {page: this.currentPage, length: this.validHeroList.length, limit: this.limit})
            const limit = this.heroList.length
            ?  +(this.currentPage - (this.validHeroList.length / this.limit)).toFixed(1) * this.limit
            : this.limit

            console.log('QUERYS => ', {limit: counter || limit, offset: this.heroList.length + this.offsetModifier} )
            marvelService.getAllHeroes({limit: counter || limit, offset: this.heroList.length + this.offsetModifier,})
            .then(res => {
                const data = res.data.data.results
                console.log('RES => ', data)
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
                    else this.getHeroes(counter, itteration + 1);
                }
            })
        }

    },
}
</script>

<style>

</style>