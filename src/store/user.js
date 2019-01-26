import firebase from 'firebase/app'
import 'firebase/auth'
import router from '@/router'

export default {
	state: {
		user: {
			uid: null,
			isAuthenticated: false,
			email: null,
			name: null
		}
	},
	mutations: {
		'SET_USER'(state, payload) {
			state.user.isAuthenticated = true;
			state.user.uid = payload.uid;
			state.user.email = payload.email;
			state.user.name = payload.displayName;
		},
		'UNSET_USER'(state) {
			state.user = {
				uid: null,
				isAuthenticated: false,
				email: null,
				name: null
			}
		}
	},
	actions: {
		signUp({commit}, payload) {
			commit('SET_PROCESSING', true);
			commit('CLEAR_ERROR');
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
			.then((data) => {
				data.user.updateProfile({
					displayName: payload.name
				})
				commit('SET_PROCESSING', false);
			})
			.catch((error) => {
				commit('SET_ERROR', error.message);
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
		async signOut() {
			await firebase.auth().signOut();
			router.push('/welcome');
		},
		stateChanged({commit}, payload) {
			if(payload) {
				commit('SET_USER', payload);
			} else {
				commit('UNSET_USER');
			}
		},
	},
	getters: {
		isUserAuthenticated: (state) => state.user.isAuthenticated,
		getUserId: (state) => state.user.uid
	}
}