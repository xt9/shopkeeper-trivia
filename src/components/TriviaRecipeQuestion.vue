<template>
  <div class="TriviaRecipeQuestion">
    <h3>What Item does the following components produce?</h3>

    <img
      class="component"
      v-for="(componentItem, i) in question.components"
      :src="getIconPath(componentItem.id)"
      :key="'componentitem' + i"
      :alt="getItemName(componentItem.id)"
    />

    <h2>Pick one</h2>
    <div class="choices">
      <img
        class="choice"
        v-for="(choiceItem, i) in question.choices"
        :src="getIconPath(choiceItem.id)"
        :key="'choiceitem' + i"
        :alt="getItemName(choiceItem.id)"
        @click="answer(choiceItem.id)"
      />
    </div>

    <div v-if="feedback">
      <h1 :class="{ correct: wasCorrect, incorrect: !wasCorrect }">{{ feedback.msg }}</h1>
    </div>
  </div>
</template>

<script>
import {
  getRandomRecipeItem,
  getUniqueRecipeItem,
  getItemName,
  getItems,
  shuffle
} from "../util/question";

export default {
  name: "TriviaRecipeQuestion",
  data() {
    return {
      feedback: null,
      wasCorrect: null,
      question: this.generateQuestion()
    };
  },
  methods: {
    getItemName: id => getItemName(id),
    getIconPath: id => {
      return require(`@/assets/items/${id}.png`);
    },
    answer(id) {
      if (this.wasCorrect === null) {
        this.wasCorrect = id === this.question.answer.id;
        this.feedback = this.wasCorrect
          ? { msg: "Good job!" }
          : { msg: "You suck!" };

        setTimeout(() => {
          this.question = this.generateQuestion();
          this.feedback = null;
          this.wasCorrect = null;
        }, 800);
      }
    },
    generateQuestion() {
      let choices = [];
      let answer = getRandomRecipeItem();
      let components = getItems(answer.recipe);

      choices.push(answer);
      for (let i = 1; i <= 11; i++) {
        choices.push(getUniqueRecipeItem(choices));
      }
      choices = shuffle(choices);

      return {
        answer,
        choices,
        components
      };
    }
  }
};
</script>

<style scoped>
.choices {
  width: 50%;
  margin: auto;
}
.correct {
  color: greenyellow;
}
.incorrect {
  color: red;
}

img.choice,
img.component {
  border: 4px solid #424242;
  margin-right: 12px;
  margin-top: 12px;
}
img.choice:hover {
  border: 4px solid #bcbcbc;
}
</style>