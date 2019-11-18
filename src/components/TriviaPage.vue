<template>
  <div class="wrapper">
    <button :class="mode === 'easy' ? 'active' : ''" @click="setMode('easy')">Easy Questions</button>
    <button :class="mode === 'hard' ? 'active' : ''" @click="setMode('hard')">Hard Questions</button>

    <div class="TriviaPage">
      <h1>Shopkeepers Trivia</h1>
      <TriviaRecipeQuestion v-if="mode === 'easy'" />
      <TriviaRecipeBuildQuestion v-if="mode === 'hard'" />
    </div>
  </div>
</template>

<script>
import TriviaRecipeQuestion from "./TriviaRecipeQuestion";
import TriviaRecipeBuildQuestion from "./TriviaRecipeBuildQuestion";

export default {
  name: "TriviaPage",
  components: {
    TriviaRecipeQuestion,
    TriviaRecipeBuildQuestion
  },
  data() {
    return {
      mode: "hard"
    };
  },
  methods: {
    setMode(mode) {
      this.mode = mode;
    }
  }
};
</script>

<style scoped>
.wrapper {
  text-align: center;
}
button {
  padding: 6px;
  width: 33%;
  height: 50px;
  margin: 14px 6px;
  font-size: 1.2em;
  background: #171717;
  color: aqua;
  border: 0;
  border-radius: 6px;
}
button.active {
  border-bottom: 4px solid aqua;
}
button:hover {
  background: #333;
}
.TriviaPage {
  margin: auto;
  margin-top: 30px;
  width: 50%;
  text-align: center;
}
</style>