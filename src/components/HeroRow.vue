<template>
  <tr class="hero-row">
    <td>
      <div class="p-2">
        <v-img
            width="200px"
            min-height="200px"
            :src="setImgURL"
            :alt="hero.name"
            height="100px"
        >
        </v-img>
      </div>
    </td>

    <td>
      <div class="p-2">

        <v-btn
            class="mx-2 action"
            fab
            light
            small
            depressed
            style="cursor: pointer;"
            @click="onStarClick()"
        >
          <font-awesome-icon
              :icon="['fas', 'star']"
              :style="{'color': isHeroRegistered ? '#ffbd00': 'grey'}"
          >
          </font-awesome-icon>
        </v-btn>

        <Dialog
            :btn="{type: 'small', lightUp: hero.edited}"
            :dialogValue="editionDialog"
            @open="openDialog()"
        >
          <template v-slot:button>
            <font-awesome-icon
                :icon="['fas', 'pen']"
                :style="{'color': hero.edited ? 'white': 'grey'}">
            </font-awesome-icon>
          </template>

          <template v-slot:title>
            <h2>{{ $t('dialog.edition.title') }}</h2>
          </template>
          <template v-slot:content>
            <HeroEditionForm
                :hero="hero"
                @done="endEdition()"
            />
          </template>
        </Dialog>

      </div>
    </td>

    <td>
      <div class="p-2">
        <router-link :to="{path: `/hero/${this.hero.id}`}">
          <h2>
            {{ hero.name }}
          </h2>
        </router-link>
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
import {mapActions, mapGetters} from "vuex";
import Dialog from '@/components/share/Dialog'
import HeroEditionForm from '@/components/HeroEditionForm'

export default {
  name: "HeroRow",
  components: {Dialog, HeroEditionForm},
  props: {
    hero: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      editionDialog: false,
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
    ...mapActions(['removeOneHero', 'addOneHero']),
    onStarClick() {
      if (this.isHeroRegistered) {
        this.removeOneHero(this.hero.id)
            .then(() => {
              // this.registeredHero = false;
            });
      } else {
        this.addOneHero(this.hero)
            .then(() => {

            });
      }
    },
    openDialog() {
      this.editionDialog = true
    },
    endEdition() {
      this.editionDialog = false;
    }
  }

}
</script>

<style lang="scss" scoped>

.action {
  //width: 30px;
  //height: 30px;
  display: grid;
  place-items: center;
  padding: 5px;
  text-align: center;
  margin: 20px 0;
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

a {
  cursor: pointer;
  color: black;
  text-decoration: none;

  &:hover {
    color: black;
    text-decoration: underline;
  }
}

h2 {
  cursor: pointer;
  color: black;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>