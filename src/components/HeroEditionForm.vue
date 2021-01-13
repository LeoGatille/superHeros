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
            <v-btn @click="setDefaultValues()">
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
      return this.formatedURl.path ?  this.formatedURl.path + '.' + this.formatedURl.extension : '';
    },
  },
  created() {
    console.log(this.hero)
    this.setDefaultValues();
  },
  methods: {
    ...mapActions(['editHero']),
    setDefaultValues() {
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
      this.hero.edited = true;
      this.hero.name = this.name;
      this.hero.description = this.description;
      this.hero.thumbnail = {...this.formatURL()};
      this.editHero(this.hero)
        .then(() => {
          this.endEdition();
        });
    },
    endEdition() {
      this.$emit('endEdition');
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