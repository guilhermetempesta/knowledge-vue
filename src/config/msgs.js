import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
  theme: "bubble", 
  iconPack: 'fontawesome',
  position: "top-center",
  duration: 3000
})

Vue.toasted.register(
  'defaultSuccess',
  payload => !payload.message ? 'Operação realizada com sucesso!' : payload.message,
  { type: 'success', icon: 'check' }
)

Vue.toasted.register(
  'defaultError',
  payload => !payload.message ? 'Ocorreu um erro inesperado.' : payload.message,
  { type: 'error', icon: 'times'}
)