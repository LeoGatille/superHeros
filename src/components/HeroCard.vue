<template>

  <v-card
      class="card"
      style="position: relative"
      max-width="300"
      height="450"
  >

    <div
        class="actions-container"
        :class="{'stealth' : !isHeroRegistered}"
    >
      <div class="action-btn bounce">

        <v-btn
            class="mx-2 action "
            fab
            light
            small
            depressed
            style="cursor: pointer;"

        >
          <font-awesome-icon
              :icon="['fa', 'trash']"
          >
          </font-awesome-icon>
        </v-btn>
        <!-- <v-btn
            class="mx-2 action "
            fab
            light
            small
            depressed
            style="cursor: pointer;"

            @click="onStarClick()"
        >
          <font-awesome-icon
              :icon="['fas', 'star']"
              :style="{'color': isHeroRegistered ? '#ffbd00': 'grey'}"
          >
          </font-awesome-icon>
        </v-btn> -->
      </div>

      <div class="action-btn">
        <Dialog
            :btn="{type: 'small', lightUp: hero.edited}"
            :dialogValue="editionDialog"
            @open="openDialog()"
        >
          <template v-slot:button>
            <font-awesome-icon
                :icon="['fas', 'pen']"
                :style="{'color': hero.edited ? 'white': 'grey'}">
            </font-awesome-icon>
          </template>

          <template v-slot:title>
            <h2>{{ $t('dialog.edition.title') }}</h2>
          </template>
          <template v-slot:content>
            <HeroEditionForm
                :hero="hero"
                @done="endEdition()"
            />
          </template>
        </Dialog>
      </div>
    </div>
          <div class="img-relative-container">
    <v-img
        class="blur-none transition link"
        :class="{'blur-full': isLinkHovered}"
        :height="'100%'"
        :src="setImgURL"
    ></v-img>
              <font-awesome-icon
                class="icon-big opacity-none transition"
                :class="{'opacity-full': isLinkHovered}"
                :icon="['fas', 'eye']"
              ></font-awesome-icon>
          </div>
    <div
        style="display: flex; flex-direction:column; justify-content: space-between; align-items: center; height: 60%; position: relative">
      <router-link
          :to="'/hero/' + hero.id"
      >
        <v-card-title
            class="title"
            @mouseenter="setLinkHovered(true)"
            @mouseleave="setLinkHovered(false)"
        >
          {{ shrinkText(hero.name, 30) }}
        </v-card-title>
      </router-link>

      <v-card-text class="card-text-min-height link">
        <!-- need a new component -->
        <div>{{ shrinkText(hero.description, 100) }}</div>
      </v-card-text>

      <v-card-actions class="justify-center" style="display: flex; flex-wrap: wrap">
        <v-chip
            style="margin: 10px"
            outlined
            :color="chip.color"
            class="shrink-text card-chip"
            v-for="chip in setHeroChips"
            :key="chip.name"
        >
          {{ $t('heroItems.' + chip.name) + ' : ' + (chip.length ? chip.length : 0) }}
        </v-chip>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
// import LocalService from '@/api/services/LocalService'
import {mapActions, mapGetters} from "vuex";
import Dialog from '@/components/share/Dialog'
import HeroEditionForm from "@/components/HeroEditionForm";
export default {
  name: "HeroCard",
  components: {HeroEditionForm, Dialog},
  props: {
    hero: {
      required: true
    }
  },
  data() {
    return {
      editionDialog: false,
      hoveringLink: false,
      registeredHero: false,
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(['getHeroById']),
    setImgURL() {
      return this.hero.thumbnail.path + '.' + this.hero.thumbnail.extension
    },
    isHeroRegistered() {
      return !!this.hero.savedDate;
    },
    setHeroChips() {
      return [
        {
          color: 'red accent-4',
          name: 'comics',
          length: this.hero.comics.items.length,
        },
        {
          color: 'blue darken-1',
          name: 'series',
          length: this.hero.series.items.length,
        },
        {
          color: 'orange lighten-1',
          name: 'stories',
          length: this.hero.stories.items.length,
        },
        {
          color: 'teal lighten-2',
          name: 'events',
          length: this.hero.events.items.length,
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
          if (i <= nbCharacters) {
            shrunkDescription.push(letter);
          }
        });
        if (text.length > shrunkDescription.length) {
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
    ...mapActions(['addOneHero', 'removeOneHero', 'delete']),


    // isHeroRegistered() {
    //   LocalService.isHeroInLocalStorage(this.hero.id)
    //       .then(isRegistered => {
    //
    //         this.registeredHero = isRegistered;
    //       });
    // },
    setLinkHovered(hovered) {
      this.hoveringLink = hovered;
    },
    onStarClick() {
      if (this.isHeroRegistered) {
        this.removeOneHero(this.hero.id)
            .then(() => {
              // this.registeredHero = false;
            })
      } else {
        this.$store.dispatch('addOneHero', this.hero)
            .then(() => {
              // this.registeredHero = true;
            });
      }
    },
    endEdition() {
      this.editionDialog = false;
    },
    openDialog() {
      this.editionDialog = true;
    }
  },
}
</script>

<style lang="scss" scoped>
@import "src/SCSS/HeroTags";

.card {
  margin: 10px;
  transition: transform ease-in-out 0.2s;
  .stealth {
    opacity: 0;
    transition: opacity ease-in-out 0.2s;
  }

  &:hover {
    transform: scale(1.05);
    .stealth {
      opacity: 1;
    }
  }
}
  .title {
    word-break: break-word;
    text-align: center;
    margin-bottom: 5px;
    padding-bottom: 0;
    &:hover {
      text-decoration: underline;
    }
  }

.shrink-text {
  overflow: hidden;
  text-overflow: clip ellipsis;
}

.card-chip {
  white-space: nowrap;
  min-width: 100px;
}

.card-text-min-height {
  height: 70px;
  padding: 0 15px;
}

.actions-container {
  width: 100px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 100;
  right: 10px;
  top: 0;

  .action-btn {
    padding-top: 5%;
    width: max-content;

  }


}

.card-action-btn-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  z-index: 100;
  right: 15px;
  top: 0;
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
  height: 40%;
  overflow: hidden;
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
.blur-none {
  filter: blur(0);
}
.blur-full {
  transform: scale(1.3);
  //filter: blur(1px);
}
.opacity-none {
  opacity: 0;
  filter: blur(20px);
}

.opacity-full {
  opacity: 1;
  filter: blur(0px);
}

.v-application a {
  color: black;
}
.bounce {

  &:hover {
    .action {

      animation-name: boing-boing;
      animation-duration: 0.6s;
      animation-iteration-count: 1;
    }
  }
}


</style>