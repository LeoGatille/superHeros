<template>
  <v-data-table
      :headers="setHeaders"
      :items="this.heroList"
      :hide-default-footer="true"
      disable-pagination
      @click:row="handleClick"
      @mouseenter:row="setHoveredHero(true, id)"
      @mouseleave:row="setHoveredHero(false,)"
  >

    <template v-slot:item.image="{ item }">
      <div class="p-2">
<!--        <div v-if="item.savedDate || isHeroHovered" class="card-action-btn-container">-->
<!--          <v-tooltip bottom>-->
<!--            <template v-slot:activator="{ on, attrs }">-->
<!--              <v-btn icon color="white" @click="onStarClick()" v-bind="attrs"-->
<!--                     v-on="on">-->
<!--                <font-awesome-icon :icon="['fas', 'star']" :style="{'color': item.savedDate ? '#ffbd00': 'grey'}"></font-awesome-icon>-->
<!--              </v-btn>-->

<!--            </template>-->
<!--            <span v-if="!item.savedDate">{{$t('tooltip.btn.add')}}</span>-->
<!--            <span v-else>{{$t('tooltip.btn.remove')}}</span>-->
<!--          </v-tooltip>-->
<!--        </div>-->
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
  data() {
    return {
      hoveredHero: -1
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
      // hero.image = this.setImgURL(hero);
    })
  },
  methods: {
    setImgURL(hero) {
      return hero.thumbnail.path + '.' +  hero.thumbnail.extension;
    },
    handleClick(event) {
      this.$router.push({path: `/hero/${event.id}`});
      console.log('Tab click => ', event)
    },
    isHeroHovered(id) {
      return this.hoveredHero === id;
    },

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