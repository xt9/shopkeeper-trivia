<template>
  <div class="TriviaRecipeQuestion">
    <h3 @click="componentInfo()">What items are needed to build the following item?</h3>

    <img
      class="targetItem"
      :src="getIconPath(question.targetItem.id)"
      :alt="getItemName(question.targetItem.id)"
    />

    <div class="selections">
      <img
        class="selection"
        v-for="(selection, i) in question.selections"
        :key="'selection' + i"
        :src="getIconPath(selection.id)"
        :alt="getItemName(selection.id)"
        @click="removeItem(i)"
      />
    </div>

    <div class="choices">
      <img
        class="choice"
        v-for="(choiceItem, i) in question.choices"
        :src="getIconPath(choiceItem.id)"
        :key="'choiceitem' + i"
        :alt="getItemName(choiceItem.id)"
        @click="addItem(choiceItem.id)"
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
  getUniqueItem,
  getItemName,
  getItems,
  getItem,
  shuffle
} from "../util/question";

import { flatLog } from "../util/logging";

export default {
  name: "TriviaRecipeBuildQuestion",
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
    componentInfo() {
      flatLog(this.question);
    },
    removeItem(index) {
      this.question.selections.splice(index, 1, { id: "Selection" });
    },
    addItem(id) {
      let index = this.question.selections.findIndex(selection => {
        return selection.id === "Selection";
      });
      this.question.selections.splice(index, 1, getItem(id));

      let selectionCount = this.question.selections.filter(
        s => s.id !== "Selection"
      ).length;

      if (
        this.wasCorrect === null &&
        selectionCount === this.question.targetItem.recipe.length
      ) {
        this.finishQuestion();
      }
    },
    finishQuestion() {
      this.wasCorrect = this.isCorrectAnswer();
      this.feedback = this.wasCorrect
        ? { msg: "Good Job!" }
        : { msg: "You Suck!" };

      setTimeout(() => {
        this.question = this.generateQuestion();
        this.feedback = null;
        this.wasCorrect = null;
      }, 800);
    },
    isCorrectAnswer() {
      let temp = [...this.question.selections];
      let correctCount = this.question.targetItem.recipe.reduce((total, id) => {
        let item = temp.find(selection => selection.id === id);
        if (item) {
          let index = temp.findIndex(selection => selection.id === item.id);
          // delete from temp so that a single item won't be matched multiple times for stuff like
          // Orchid_Malevolence that has more than one of the same item.
          temp.splice(index, 1);
          return item ? total + 1 : total;
        }
      }, 0);
      return correctCount === this.question.targetItem.recipe.length;
    },
    generateQuestion() {
      let choices = [];
      let targetItem = getRandomRecipeItem();
      let containsOnlyBaseItems = true;

      targetItem.recipe.forEach(id => {
        let item = getItem(id);
        choices.push(item);
        if (item.recipe) {
          containsOnlyBaseItems = false;
        }
      });

      for (let i = 1; i <= 16 - targetItem.recipe.length; i++) {
        choices.push(getUniqueItem(choices, containsOnlyBaseItems));
      }
      choices = shuffle(choices);

      // Empty list of selections as long as the correct recipe
      let selections = targetItem.recipe.map(() => ({
        id: "Selection"
      }));

      return {
        targetItem,
        choices,
        selections
      };
    }
  }
};
</script>

<style scoped>
.selection {
  display: inline-block;
  width: 88px;
  height: 64px;
  border: 4px solid #555;
  margin-right: 12px;
  margin-top: 18px;
  margin-bottom: 18px;
}
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
img.targetItem {
  border: 4px solid #424242;
}
img.choice {
  margin-right: 12px;
  margin-top: 12px;
}
img.selection:hover {
  border: 4px solid #c22d2d;
}
img.choice:hover {
  border: 4px solid #bcbcbc;
}
</style>