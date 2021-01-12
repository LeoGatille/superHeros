<template>
  <v-form>
    <v-row>
      <v-col cols="3">
        <v-img
          :src="setImgURL"
        >
        </v-img>
        <v-text-field
        ></v-text-field>
      </v-col>
      <v-col cols="9">
        <v-text-field
            v-model="hero.name"
            label="NAME TO TRANSLATE"
            required
        ></v-text-field>
        <v-textarea
            v-model="hero.description"
            label="DESCRIPTION TO TRANSLATE"
            required
        ></v-textarea>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: "HeroEditionForm",
  data() {
    return {
      newImgURL: {
        path: '',
        extension: '',
      }
    }
  },
  props: {
    hero: {
      required: true,
      type: Object,
    }
  },
  computed: {
    setImgURL() {
      return this.hero.thumbnail.path + '.' + this.hero.thumbnail.extension;
    },
  },
  methods: {
    // setImgURLObject(value) {
    //   const splitedURL = value.split(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/)
    // }
  }
}
</script>

<style scoped>

</style>