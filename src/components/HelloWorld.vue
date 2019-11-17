<template>
  <div class="hello">
    <h2>{{ presentation }}</h2>

    <h4>Change {{ name }}'s name</h4>
    <input v-model="newName" placeholder="Name..." />
    <button @click="setName(newName)">Update your name</button>

    <div class="dataLoader" v-if="!havePets">
      <h4>Get some data</h4>
      <button @click="fetchPets">Fetch data</button>
      <p v-if="loadingPets">Loading pets...</p>
    </div>

    <div v-if="havePets" class="pets">
      <h3>My pets</h3>

      <ul>
        <li v-for="pet in pets" v-bind:key="pet">{{ pet.name }} ({{ pet.gender }}, {{ pet.animal }})</li>
      </ul>

      <h4>Filtered By Males</h4>
      <ul>
        <li
          v-for="pet in getPetsByGender('male')"
          v-bind:key="pet"
        >{{ pet.name }} ({{ pet.gender }}, {{ pet.animal }})</li>
      </ul>

      <h4>Filtered By Females</h4>
      <ul>
        <li
          v-for="pet in getPetsByGender('female')"
          v-bind:key="pet"
        >{{ pet.name }} ({{ pet.gender }}, {{ pet.animal }})</li>
      </ul>

      <h4>Filtered by Cats</h4>
      <ul>
        <li
          v-for="pet in getPetsByAnimal('cat')"
          v-bind:key="pet"
        >{{ pet.name }} ({{ pet.gender }}, {{ pet.animal }})</li>
      </ul>

      <h4>Filtered by Parakeets</h4>
      <ul>
        <li
          v-for="pet in getPetsByAnimal('parakeet')"
          v-bind:key="pet"
        >{{ pet.name }} ({{ pet.gender }}, {{ pet.animal }})</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "HelloWorld",
  data: () => ({
    newName: ""
  }),
  computed: {
    ...mapState(["name", "loadingPets", "pets"]),
    ...mapGetters(["presentation", "getPetsByGender", "getPetsByAnimal"]),
    havePets() {
      return this.$store.state.pets.length > 0;
    }
  },
  methods: {
    ...mapMutations(["setName"]),
    ...mapActions(["fetchPets"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dataLoader,
.pets {
  margin-top: 32px;
}

ul {
  padding: 0;
}
</style>
