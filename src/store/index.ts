import { createStore } from 'vuex'
import { request } from '@/api/request';

export default createStore({
	state: {
		profile: [],
		projects: {},
		myProjects: {},
		dashboard: [],
		priority: [
			{
				label: 'high',
				value: '1'
			},
			{
				label: 'medium',
				value: '2'
			},			{
				label: 'low',
				value: '3'
			}
		]
	},
	getters: {
		profile: (state) => state.profile[0],
		projects: (state) => state.projects,
		myProjects: (state) => state.myProjects,
		priority: (state) => state.priority,
		dashboard: (state) => state.dashboard[0],
	},
	mutations: {
		SET_PROFILE (state, payload) {
			state.profile = payload
		},
		SET_PROJECTS (state, payload) {
			state.projects = payload
		},
		SET_MYPROJECTS (state, payload) {
			state.myProjects = payload
		},
		SET_DASHBOARD (state, payload) {
			state.dashboard = payload
		}
	},
	actions: {
		profile ({ commit }) {
			return request({ method: 'get', url: 'profile/'})
				.then(({ data })=> {
					commit('SET_PROFILE', data)
				})
		},
		projects ({ commit }) {
			return request({ method: 'get', url: 'projects/'})
				.then(({ data })=> {
					commit('SET_PROJECTS', data)
				})
		},

		myProjects ({ commit }) {
			return request({ method: 'get', url: 'projects/my/'})
				.then(({ data })=> {
					commit('SET_MYPROJECTS', data)
				})
		},

		async dashboard ({ commit }) {
			const { data } = await request({ method: 'get', url: 'dashboard/' });
			commit('SET_DASHBOARD', data);
			return data;
		},
		editProfile ({ commit }, data) {
			return request({ method: 'post', url: 'profile/edit_profile/', data})
		},
		changeStatus ({ commit }, data) {
			request({ method: 'post', url: '/profile/change_status/', data}, )
		},

		createProject ({ commit }, data) {
			request({ method: 'post', url: 'projects/', data}, )
		}
	},
	modules: {
	}
})
