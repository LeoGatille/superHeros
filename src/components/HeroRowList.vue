<template>
  <v-data-table
      :headers="setHeaders"
      :items="this.heroList"
      :hide-default-footer="true"
      disable-pagination
      @mouseenter:row="setHoveredHero(true, id)"
      @mouseleave:row="setHoveredHero(false,)"
  >
    <template #item="{item}">
        <HeroRow :hero="item" />
    </template>
  </v-data-table>
</template>


<script>
import HeroRow from "@/components/HeroRow";

export default {
  name: "HeroRowList",
  components: {HeroRow},
  props: {
    heroList: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      hoveredHero: -1
    }
  },
  computed: {
    setHeaders() {
      return [
        {text: this.$t('table.header.picture'), value: 'image'},
        {text: 'Actions', value: 'actions'},
        {text: this.$t('table.header.name'), value: 'name'},
        {text: 'Description', value: 'description'},
        {text: 'Comics', value: 'comics'},
        {text: this.$t('table.header.stories'), value: 'stories'},
        {text: 'Series', value: 'series'},
        {text: this.$t('table.header.events'), value: 'events'},
      ];
    },
  },
  created() {
  },
  methods: {
    rowClick(id) {
      this.$router.push({path: `/hero/${id}`});
    },
  }
}
</script>

<style scoped>
/*.v-data-table >>> div > table {*/
/*}*/

</style>