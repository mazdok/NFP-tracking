import firebase from 'firebase'

export default {
	state: {
		user: {
			isAuthenticated: false,
			uid: null
		}
	},
	mutations: {
		'SET_USER'(state, payload) {
			state.user.isAuthenticated = true;
			state.user.uid = payload;
		},
		'UNSET_USER'(state) {
			state.user = {
				isAuthenticated: false,
				uid: null
			}
		}
	},
	actions: {
		signUp({commit}, payload) {
			commit('SET_PROCESSING', true);
			commit('CLEAR_ERROR');
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
			.then(() => {
				commit('SET_PROCESSING', false);
			})
			.catch((error) => {
				commit('SET_ERROR', error.message)
				commit('SET_PROCESSING', false);
			})
		},
		signIn({commit}, payload) {
			commit('SET_PROCESSING', true);
			commit('CLEAR_ERROR');
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
			.then(() => {
				commit('SET_PROCESSING', false);
			})
			.catch((error) => {
				commit('SET_ERROR', error.message)
				commit('SET_PROCESSING', false);
			})
		},
		signOut() {
			firebase.auth().signOut();
		},
		stateChanged({commit, getters}, payload) {
			if(payload) {
				commit('SET_USER', payload.uid);
			} else {
				commit('UNSET_USER');
			}
		},
	},
	getters: {
		isUserAuthenticated: (state) => state.user.isAuthenticated,
		getUserId: (state) => {
			return state.user.uid
		}
	}
}