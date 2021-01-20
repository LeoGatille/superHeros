<template>
  <v-form ref="form" v-model="formValidity">
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
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                color="error"
                @click="endEdition()"
            >
              {{ $t('btn.edition.cancel.text') }}
            </v-btn>
          </template>
          <span>{{ $t('btn.edition.cancel.tooltip') }}</span>
        </v-tooltip>

        <v-spacer></v-spacer>

        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <v-btn
                v-bind="attrs"
                v-on="on"
                color="teal white--text"
                :disabled="!hero.edited"
                @click="reset()"
            >
              {{ $t('btn.edition.reset.text') }}
            </v-btn>
          </template>
          <span>{{ $t('btn.edition.reset.tooltip') }}</span>
        </v-tooltip>

        <v-spacer></v-spacer>

        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <v-btn
                v-bind="attrs"
                v-on="on"
                color="primary"
                :disabled="!isFormValid"
                @click="submit()"
            >
              {{ $t('btn.edition.apply.text') }}
            </v-btn>

          </template>
          <span>{{ $t('btn.edition.apply.tooltip') }}</span>
        </v-tooltip>

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
      formValidity: false,
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
    isFormValid() {
      return this.formValidity && this.doesFormValuesChanged;
    },
    doesFormValuesChanged() {
      return (
          (this.name !== this.hero.name)
          || (this.description !== this.hero.description)
          || (this.imgURL !== (this.hero.thumbnail.path + '.' + this.hero.thumbnail.extension))
      )
    },
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
      this.name = JSON.parse(JSON.stringify(this.hero.name));
      this.description = this.hero.description;
      this.imgURL = this.setImgURL;
      this.formatedURl = this.hero.thumbnail;
    },
    formatURL() {
      const splitURL = this.imgURL.split(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/);
      return {path: splitURL[0], extension: splitURL[1]}
    },
    testURl(url) {
      return /(https?:\/\/.*\.(?:gif|jpe?g|tiff?|png|webp|bmp))/i.test(url)
    },
    submit() {
      const editedValues = JSON.parse(JSON.stringify(this.hero));
      editedValues.edited = true
      editedValues.name = this.name
      editedValues.description = this.description
      editedValues.thumbnail = (this.imgURL.length ? {...this.formatURL()} : this.hero.thumbnail)

      // this.$set(this.hero, 'edited', true);
      // this.$set(this.hero, 'name', this.name);
      // this.$set(this.hero, 'description', this.description);
      // this.$set(this.hero, 'thumbnail', this.imgURL.length ? {...this.formatURL()} : this.hero.thumbnail);
      this.editHero(editedValues)
          .then(() => {
            this.endEdition();
          });
    },
    reset() {
      if (this.hero.edited) {
        this.resetHero(this.hero)
            .then((hero) => {
              // this.setDefaultValues();
              //! NOT the good way
              this.name = hero.name;
              this.description = hero.description;
              this.imgURL = hero.thumbnail.path + '.' + hero.thumbnail.extension;
              this.endEdition();
              this.$emit('done');

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