<template>

  <v-card
      @mouseenter="setLinkHovered(true)"
      @mouseleave="setLinkHovered(false)"

      class="card"
      style="position: relative"
      max-width="300"
      height="400"
  >
      <div v-if="registeredHero || hoveringLink" class="card-action-btn-container">
        <v-btn icon color="white" @click="onStarClick()">
          <font-awesome-icon :icon="['fas', 'star']" :style="{'color': registeredHero ? '#ffbd00': 'grey'}"></font-awesome-icon>
        </v-btn>
      </div>
    <router-link
        :to="'/hero/' + hero.id"

    >
        <div class="img-relative-container">
          <v-img class="blur-none transition link" :class="{'blur-full': isLinkHovered}"
            height="150"
            :src="setImgURL"
          ></v-img>
<!--          <font-awesome-icon-->
<!--            class="icon-big opacity-none transition"-->
<!--            :class="{'opacity-full': isLinkHovered}"-->
<!--            :icon="['fas', 'eye']"-->
<!--          ></font-awesome-icon>-->
        </div>
        <v-card-title>
          {{hero.name}}
        </v-card-title>

      <v-card-text class="card-text-min-height link">
        <!-- need a new component -->
        <div>{{shrinkText(hero.description, 100)}}</div>
      </v-card-text>
        <v-card-text>
          <v-chip-group column>
              <v-chip
                  disabled
                  class="shrink-text card-chip"
                  v-for="chip in setHeroChips"
                  :key="chip.name"
              >
                  {{$t('heroItems.' + chip.name) + ' : ' + chip.length}}
              </v-chip>
          </v-chip-group>
        </v-card-text>
    </router-link>
  </v-card>
</template>

<script>
import LocalService from '@/api/services/LocalService'
import {mapActions, mapGetters} from "vuex";

export default {
  name: "HeroCard",
  props: {
    hero: {
      required: true
    }
  },
  data() {
    return {
      hoveringLink: false,
      registeredHero: false,
    }
  },
  created() {
    this.isHeroRegistered();
  },
  computed: {
    ...mapGetters(['getHeroById']),
    setImgURL() {
      return this.hero.thumbnail.path + '.' + this.hero.thumbnail.extension
    },
    setHeroChips(){
      return [
        {
          name: 'series',
          length: this.hero.series.available,
        },
        {
          name: 'comics',
          length: this.hero.comics.available,
        },
        {
          name: 'stories',
          length: this.hero.stories.available,
        },
        {
          name: 'events',
          length: this.hero.events.available,
        }
      ]
    },
    shrinkText() {
      return (text, nbCharacters) => {
        if (!text.length) {
          return;
        }
        const shrunkDescription = [];
        text.split('').forEach((letter, i) => {
          if(i <= nbCharacters) {
            shrunkDescription.push(letter);
          }
        });
        if(text.length > shrunkDescription.length) {
          shrunkDescription.push('...')
        }
        return shrunkDescription.join('');
      }
    },
    isLinkHovered() {
      return this.hoveringLink
    },
    getHeroWithId() {
      return this.getHeroById(this.hero.id);
    },
  },
  methods: {
    ...mapActions(['addOneHero', 'removeOneHero']),
    isHeroRegistered(){
      LocalService.isHeroInLocalStorage(this.hero.id)
      .then(isRegistered => {

        this.registeredHero = isRegistered;
      });
    },
    setLinkHovered(hovered){
      this.hoveringLink = hovered;
    },
    onStarClick() {
      if(this.registeredHero) {
        this.removeOneHero(this.hero.id)
          .then(() => {
            this.registeredHero = false;
          })
      } else {
        this.$store.dispatch('addOneHero', this.hero.id)
        .then(() => {
          this.registeredHero = true;
        });
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .card {
    margin: 10px;
    transition: transform ease-in-out 0.2s;
    &:hover {
      transform: scale(1.05);
    }
  }
  .shrink-text {
    overflow: hidden;
    text-overflow: clip ellipsis;
  }
  .card-chip {
    white-space: nowrap;
    max-width: 100px;
  }
  .card-text-min-height {
    height: 70px;
  }
  .card-action-btn-container {
    position: absolute;
    z-index: 100;
    right: 15px;
    top: 0;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 0 0 100% 100%;
    box-shadow: 0px 4px 3px 1px rgba(0, 0, 0, 0.5);
  }
 a {
   cursor: pointer;
   color: black;
   text-decoration: none;
   &:hover {
     color: black;
     text-decoration: none;
   }
 }
 .img-relative-container {
   position: relative;
   display: grid;
   place-items: center;
   color: black;
 }
 .icon-big {
   color: white;
   font-size: 3em;
   position: absolute;
 }
  // Dynamic styles
  .transition {
    transition: all ease-in-out 0.2s;
  }
  //* too kitch
  //.blur-none {
  //  filter: blur(0);
  //}
  //.blur-full {
  //  filter: blur(2px);
  //}
  .opacity-none {
    opacity: 0;
  }
  .opacity-full {
    opacity: 1;
  }
  .v-application a {
    color: black;
  }

</style>