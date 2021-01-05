<template>
  <div>
    <label>
      Language Selector
      <select v-model="$i18n.locale" style="border: solid red">
        <option v-for="lang in languages" :key="lang" :value="lang">{{lang}}</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: "LangSelector",
  data() {
    return {
      languages: ['en', 'fr'],
    }
  },
}
</script>

<style scoped>

</style>