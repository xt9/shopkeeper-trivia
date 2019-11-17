import { commaBuilder } from "../util/string";

export default {
    state: {
        name: 'Niklas',
        age: 26,
        likes: ['tv-shows', 'programming', 'playing online with friends']
    },
    getters: {
        likeSentence: state => {
            return commaBuilder(state.likes);
        },
        presentation: (state, getters) => {
            return `Hello my name is ${state.name} and I'm ${state.age} years old. I like ${getters.likeSentence}`
        }
    },
    mutations: {
        setName(state, name) {
            state.name = name;
        }
    },
    actions: {
    },
    modules: {
    }
};