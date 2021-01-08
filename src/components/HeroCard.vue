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
      <div>{{shrinkDescription(hero.description, 100)}}</div>
    </v-card-text>
      <v-card-text>
        <v-chip-group>
          <v-chip
              class="shrink-text card-chip"
              v-for="serie in hero.series.items"
              :key="serie.resourceURI">
            <p>
              {{serie.name}}
            </p>
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
    shrinkDescription() {
      return (description, nbCharacters) => {
        const shrinkedDescription = [];
        this.hero.description.split('').forEach((letter, i) => {
          if(i <= nbCharacters) {
            shrinkedDescription.push(letter);
          }
        });
        if(description.length > shrinkedDescription.length) {
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

<style scoped>
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
</style>