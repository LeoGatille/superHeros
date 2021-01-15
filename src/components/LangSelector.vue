<template>
  <div style="z-index: 99999;">
    <div class="text-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              v-bind="attrs"
              v-on="on"
              icon
          >
            <font-awesome-icon :icon="['fas', 'language']"/>
          </v-btn>
        </template>
        <v-list :close-on-content-click="false">
          <v-list-item
              v-for="lang in languages"
              :key="lang"
              @click="setLang(lang)"
          >
            <v-list-item-title
                active-class="active-language"
                :class="isLangSelected(lang) ? 'active-language' : 'inactive-language'  "
            >{{ lang }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
<!--    <label>-->
<!--      Language Selector-->
<!--      <select v-model="$i18n.locale" style="border: solid red">-->
<!--        <option v-for="lang in languages" :key="lang" :value="lang">{{lang}}</option>-->
<!--      </select>-->
<!--    </label>-->
<!--  </div>-->
</template>

<script>
export default {
  name: "LangSelector",
  data() {
    return {
      languages: ['en', 'fr'],
    }
  },
  computed: {

  },
  methods: {
    setLang(lang) {
      this.$i18n.locale = lang;
    },
    isLangSelected(lang) {
      return this.$i18n.locale === lang;
    }
  }
}
</script>

<style scoped>
.active-language {
  color: black;
}
.inactive-language {
  color: grey;
}
</style>