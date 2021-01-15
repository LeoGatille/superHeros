<template>
  <v-data-table
      :headers="setHeaders"
      :items="this.heroList"
      :hide-default-footer="true"
      disable-pagination

  >
    <template v-slot:item.image="{ item }">
      <div class="p-2">
        <v-img width="200px" min-height="200px" :src="item.image" :alt="item.name" height="100px"></v-img>
      </div>
    </template>

    <template v-slot:item.comics="{ item }">
      <div class="p-2">
        <div class="row-badge red accent-4">
          {{ item.comics.items.length }}
        </div>
      </div>
    </template>


    <template v-slot:item.series="{ item }">
      <div class="p-2">
        <div class="row-badge blue darken-1">
          {{ item.series.items.length }}
        </div>
      </div>
    </template>

    <template v-slot:item.stories="{ item }">
      <div class="p-2">
        <div class="row-badge orange lighten-1">
          {{ item.stories.items.length }}
        </div>
      </div>
    </template>

    <template v-slot:item.events="{ item }">
      <div class="p-2">
        <div class="row-badge teal lighten-2">
          {{ item.events.items.length }}
        </div>
      </div>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "HeroRowList",
  props: {
    heroList: {
      type: Array,
      required: true,
    }
  },
  computed: {
    setHeaders() {
      return [
        {text: 'Picture', value: 'image'},
        {text: 'Name', value: 'name'},
        {text: 'Description', value: 'description'},
        {text: 'Comics', value: 'comics'},
        {text: 'Stories', value: 'stories'},
        {text: 'Series', value: 'series'},
        {text: 'Events', value: 'events'},
      ];
    },
  },
  created() {
    this.heroList.forEach(hero => {
      this.$set(hero, 'image', this.setImgURL(hero));
      console.log(hero.image)
      // hero.image = this.setImgURL(hero);
    })
  },
  methods: {
    setImgURL(hero) {
      return hero.thumbnail.path + '.' +  hero.thumbnail.extension;
    }
  }
}
</script>

<style scoped>
  /*.v-data-table >>> div > table {*/
  /*}*/
  .row-badge {
    display: grid;
    place-items: center;
    background-color: teal;
    padding: 5px;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    color: white;
    text-align: center;
  }
</style>