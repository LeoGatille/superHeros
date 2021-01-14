<template>
  <v-form ref="form">
    <v-row>
      <v-col cols="3">
        <v-img
          :src="setImgURL"
        >
        </v-img>
        <v-text-field
          v-model="imgURL"
          :rules="urlRules"
          :label="labelImgURL"
        ></v-text-field>
      </v-col>

      <v-col cols="9">
        <v-text-field
            v-model="name"
            :label="this.$t('form.label.name')"
            :rules="nameRules"
            required
        ></v-text-field>
        <v-textarea
            v-model="description"
            :label="this.$t('form.label.description')"
            required
        ></v-textarea>
      </v-col>

    </v-row>
      <v-row>
          <v-spacer></v-spacer>
          <v-col cols="3" style="display: flex">
            <v-btn>
              cancel
            </v-btn>
          <v-spacer></v-spacer>
            <v-btn @click="reset()">
              reset
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="submit()">
              apply
            </v-btn>
          </v-col>
      </v-row>
  </v-form>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "HeroEditionForm",
  props: {
    hero: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      name: '',
      description: '',
      imgURL: '',
      formatedURl: {
        path: '',
        extension: '',
      },
      nameRules: [name => !!name || this.$t('form.error.name')],
      urlRules: [url => this.testURl(url) || this.$t('form.error.imgURL')],
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
      return (this.imgURL.length && this.testURl(this.imgURL)) ? this.imgURL : (this.hero.thumbnail.path + '.' + this.hero.thumbnail.extension);
    },
  },
  created() {
    this.setDefaultValues();
  },
  methods: {
    ...mapActions(['editHero', 'resetHero']),
    setDefaultValues() {
      console.log('heroName => ', this.hero.name)
      this.name = this.hero.name;
      this.description = this.hero.description;
      this.formatedURl = this.hero.thumbnail;
    },
    formatURL() {
      const splitURL = this.imgURL.split(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/);
      return {path: splitURL[0], extension: splitURL[1] }
    },
    testURl(url) {
      return /(https?:\/\/.*\.(?:gif|jpe?g|tiff?|png|webp|bmp))/i.test(url)
    },
    submit() {
      this.$set(this.hero, 'edited', true);
      this.$set(this.hero, 'name', this.name);
      this.$set(this.hero, 'description', this.description);
      this.$set(this.hero, 'thumbnail', this.imgURL.length ? {...this.formatURL()} : this.hero.thumbnail);
      // this.hero.edited = true;
      // this.hero.name = this.name;
      // this.hero.description = this.description;
      // this.hero.thumbnail = this.imgURL.length ? {...this.formatURL()} : this.hero.thumbnail;
      this.editHero(this.hero)
        .then(() => {
          this.endEdition();
        });
    },
    reset() {
      if(this.hero.edited) {
        this.resetHero(this.hero)
        .then((hero) => {
          // this.setDefaultValues();
          //! NOT the good way
          this.name = hero.name;
          this.description = hero.description;
          this.imgURL = hero.thumbnail.path + '.' + hero.thumbnail.extension;
          this.endEdition();

        });
      }
    },
    endEdition() {
      this.$emit('done');
    }
  }
}
</script>

<style scoped>
.btn-container {
  display: flex;
  justify-content: space-between;
  width: 30%;
}
.justify-right {
  margin-left: auto;
}

</style>