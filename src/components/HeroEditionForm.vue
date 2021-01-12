<template>
  <v-form>
    <v-row>
      <v-col cols="3">
        <v-img
          :src="setImgURL"
        >
        </v-img>
        <v-text-field
          @input="setNewURL($event)"
          :label="labelImgURL"
          :error-messages="urlError"
        ></v-text-field>
      </v-col>
      <v-col cols="9">
        <v-text-field
            v-model="name"
            :label="labelName"
            :error-messages="emptyFieldError"
            required
        ></v-text-field>
        <v-textarea
            v-model="hero.description"
            :label="labelDescription"
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
      name: '',
      description: '',
      newImgURL: {
        path: '',
        extension: '',
      },
      urlError: [],
    }
  },
  props: {
    hero: {
      required: true,
      type: Object,
    }
  },
  computed: {
    labelName() {
      return this.$t('form.label.name');
    },
    labelDescription() {
      return this.$t('form.label.description');
    },
    labelImgURL() {
      return this.$t('form.label.imgURL');
    },
    setImgURL() {
      return this.newImgURL.path ?  this.newImgURL.path + '.' + this.newImgURL.extension : '';
    },
    emptyFieldError() {
      const error = [];
      if(!this.name.length) {
        error.push(this.$t('form.error.name'));
      }
      return error;
    },
  },
  created() {
    this.name = this.hero.name;
    this.description = this.hero.description;
    this.newImgURL = this.hero.thumbnail;
  },
  methods: {
    setNewURL(url) {
      this.setUrlError(url);
      this.newImgURL = !this.urlError.length ? {...this.formatURL(url)} : this.hero.thumbnail;
    },
    formatURL(url) {
      const splittedURL = url.split(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/);
      return {path: splittedURL[0], extension: splittedURL[1] }
    },
    setUrlError(url) {
      const error = [];
      console.log('URL ERROR')
      if(!/\.(gif|jpe?g|tiff?|png|webp|bmp)$/.test(url)) {
        error.push(this.$t('form.error.imgURL'));
      }
      this.urlError = error;
    },
  }
}
</script>

<style scoped>

</style>