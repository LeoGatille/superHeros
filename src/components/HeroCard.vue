<template>
  <v-card class="card" style="position: relative"
      max-width="300"
          height="400"

  >
  <div class="img-relative-container" style="position: relative; display: grid; place-items: center;">
    <v-img class="blur-none transition" :class="{'blur-full': isLinkHovered}"
      height="150"
      :src="setImgURL"
      @mouseenter="setLinkHovered(true)"
      @mouseleave="setLinkHovered(false)"
    >
    </v-img>
    <font-awesome-icon class="opacity-none transition" :class="{'opacity-full': isLinkHovered}" :icon="['fas', 'eye']" style="color: white; font-size: 2em; position: absolute"></font-awesome-icon>

  </div>
    <v-card-title>{{hero.name}}</v-card-title>
    <v-card-text class="card-text-min-height">
      <!-- need a new component -->
      <div>{{shrinkText(hero.description, 100)}}</div>
<!--      <div v-if="hero.description.length" class="separation-card-body-text">-->
<!--        <div class="separation-btn">-->
<!-- <font-awesome-icon :icon="['fas', 'bars']" ></font-awesome-icon> -->
<!--        </div>-->
<!--      </div>-->
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

    <div class="card-action-btn-container">
      <v-btn icon>
        <font-awesome-icon :icon="['fas', 'star']"></font-awesome-icon>
      </v-btn>
      <v-btn icon>
        <font-awesome-icon :icon="['fas', 'eye']"></font-awesome-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "HeroCard",
  props: {
    hero: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      hoveringLink: false,
    }
  },
  created() {
  },
  computed: {
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
        const shrinkedDescription = [];
        text.split('').forEach((letter, i) => {
          if(i <= nbCharacters) {
            shrinkedDescription.push(letter);
          }
        });
        if(text.length > shrinkedDescription.length) {
          shrinkedDescription.push('...')
        }
        return shrinkedDescription.join('');
      }
    },
    isLinkHovered() {
      return this.hoveringLink
    }
  },
  methods: {
    setLinkHovered(hovered){
      console.log('Hover evetn')
      this.hoveringLink = hovered;
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    margin: 10px;
    overflow: hidden;
  }
  .shrink-text {
    overflow: hidden;
    text-overflow: clip ellipsis;
  }
  .card-chip {
    white-space: nowrap;
    max-width: 100px;
  }
  .separation-card-body-text {
    width: 100%;
    height: 1px;
    background: #c8c8c8;
    .separation-btn {
      width: 20%;
      height: 10px;
      background: #c8c8c8;
      margin: auto;
      display: grid;
      place-items: center;
    }
  }
  .card-text-min-height {
    height: 70px;
  }
  .card-action-btn-container {
    position: absolute;
    right: -50px;
    top: 0;
    display: flex;
    flex-direction: column;
  }

  // Dynamic styles
  .transition {
    transition: all ease-in-out 0.2s;
  }
  .blur-none {
    filter: blur(0);
  }
  .blur-full {
    filter: blur(2px);
  }
  .opacity-none {
    opacity: 0;
  }
  .opacity-full {
    opacity: 1;
  }

</style>