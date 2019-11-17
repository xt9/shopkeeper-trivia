let jsonBinUrl = 'https://api.jsonbin.io/b/5dcd9d8f9e3eb3638dc05622/latest';

export default {
    state: {
        loadingPets: false,
        pets: []
    },
    getters: {
        getPetsByGender: (state) => (gender) => {
            return state.pets.filter(pet => pet.gender === gender);
        },
        getPetsByAnimal: (state) => (animal) => {
            return state.pets.filter(pet => pet.animal === animal);
        }
    },
    mutations: {
        setLoading(state, loading) {
            state.loadingPets = loading;
        },
        setPets(state, pets) {
            state.pets = pets;
        }
    },
    actions: {
        async fetchPets({ commit }) {
            commit('setLoading', true);
            let response = await fetch(jsonBinUrl);
            let json = await response.json();

            setTimeout(() => {
                commit('setPets', json.pets);
                commit('setLoading', false);
            }, 500);
        }
    },
    modules: {
    }
};