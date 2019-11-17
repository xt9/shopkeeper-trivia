<template>
  <div id="app">
    <TriviaPage />
  </div>
</template>

<script>
import TriviaPage from "./components/TriviaPage.vue";

export default {
  name: "app",
  components: {
    TriviaPage
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background: #222;
  color: #ededed;
}
</style>
