import Vue from 'vue'

export const baseApiUrl = process.env.VUE_APP_BASE_API_URL

export function showError(e) {
  if (e && e.response && e.response.data) {
    Vue.toasted.global.defaultError({ message: e.response.data.message })
  } else if (typeof e==='string') {
    Vue.toasted.global.defaultError({ message: e })
  } else {
    Vue.toasted.global.defaultError()
  }
}

export function showSuccessMsg(e) {
  if (e && e.response && e.response.data) {
    Vue.toasted.global.defaultSuccess({ message: e.response.data.message })
  } else if (typeof e==='string') {
    Vue.toasted.global.defaultSuccess({ message: e })
  } else {
    Vue.toasted.global.defaultSuccess()
  }
}