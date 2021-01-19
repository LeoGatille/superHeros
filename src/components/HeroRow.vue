<template>
  <tr>
    <td>
      <div class="p-2">
        <v-img width="200px" min-height="200px" :src="setImgURL" :alt="hero.name"
               height="100px"></v-img>
      </div>
    </td>

    <td>
      <div class="p-2">
        <div class="action star">
          <font-awesome-icon
              :icon="['fas', 'star']"
              :style="{'color': isHeroRegistered ? '#ffbd00': 'grey'}"
              @click="onStarClick()"
          >
          </font-awesome-icon>
        </div>
        <div
            class="action edition"
            :style="{border: 'solid ' + (hero.edited ? '#81C784': 'grey')}"
        >
          <font-awesome-icon
              :icon="['fas', 'pen']"
              :style="{'color': hero.edited ? '#81C784': 'grey'}">
          </font-awesome-icon>
        </div>
      </div>
    </td>

    <td>
      <div class="p-2">
        <h2>
          {{ hero.name }}
        </h2>
      </div>
    </td>

    <td>
      <div class="p-2">
        <p>
          {{ hero.description }}
        </p>
      </div>
    </td>

    <td>
      <div class="p-2">
        <div class="row-badge red accent-4">
          {{ hero.comics.items.length }}
        </div>
      </div>
    </td>

    <td>
      <div class="p-2">
        <div class="row-badge blue darken-1">
          {{ hero.series.items.length }}
        </div>
      </div>
    </td>

    <td>
      <div class="p-2">
        <div class="row-badge orange lighten-1">
          {{ hero.stories.items.length }}
        </div>
      </div>
    </td>

    <td>
      <div class="p-2">
        <div class="row-badge teal lighten-2">
          {{ hero.events.items.length }}
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "HeroRow",
  props: {
    hero: {
      type: Object,
      required: true,
    }
  },

  computed: {
    ...mapGetters(['getHeroById', 'getHeroIndex']),
    setImgURL() {
      return this.hero.thumbnail.path + '.' + this.hero.thumbnail.extension;
    },
    isHeroRegistered() {
      return !!this.hero.savedDate;
    }
  },
  methods: {
    onStarClick() {
      if (this.registeredHero) {
        this.removeOneHero(this.hero.id)
            .then(() => {
              // this.registeredHero = false;
            })
      } else {
        this.$store.dispatch('addOneHero', this.hero)
            .then(() => {
              // this.registeredHero = true;
            });
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.action {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  padding: 5px;
  text-align: center;
  margin-bottom: 15px;
}

.star {
  transform: scale(2);
}

.edition {
  border-width: 1px;
  border-radius: 100%;
}

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