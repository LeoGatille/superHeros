<template>
  <v-card class="card" style="position: relative"
      max-width="300"
          height="400"

  >

    <v-img
      height="150"
      :src="setImgURL"
    ></v-img>
    <v-card-title>{{hero.name}}</v-card-title>
    <v-card-text>
      <!-- need a new component -->
      <div>{{shrinkText(hero.description, 100)}}</div>
      <div v-if="hero.description.length" class="separation-card-body-text">
        <div class="separation-btn">
<!-- <font-awesome-icon :icon="['fas', 'bars']" ></font-awesome-icon> -->
        </div>
      </div>
    </v-card-text>
      <v-card-text>
        <v-chip-group>
          <v-chip
              disabled
              class="shrink-text card-chip"
              v-for="serie in hero.series.items"
              :key="serie.resourceURI">
              {{shrinkText(serie.name, 7)}}
          </v-chip>
        </v-chip-group>
      </v-card-text>
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
  created() {
  },
  computed: {
    setImgURL() {
      return this.hero.thumbnail.path + '.' + this.hero.thumbnail.extension
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
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .card {
    margin: 10px;
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
</style>