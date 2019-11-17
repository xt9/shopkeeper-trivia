<template>
  <div class="TriviaPage">
    <h1>Shopkeepers Trivia</h1>
    <TriviaRecipeQuestion />
  </div>
</template>

<script>
import TriviaRecipeQuestion from "./TriviaRecipeQuestion";

export default {
  name: "TriviaPage",
  components: {
    TriviaRecipeQuestion
  }
};
</script>

<style scoped>
.TriviaPage {
  margin: auto;
  margin-top: 66px;
  width: 50%;
  text-align: center;
}
</style>