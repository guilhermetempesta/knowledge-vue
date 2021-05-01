<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img src="@/assets/logo.png" width="200" alt="Logo">
      <hr>
      <div class="auth-title">{{ showSignup ? 'Inscreva-se' : 'Login' }}</div>

      <input v-if="showSignup" v-model="user.firstName" name="firstName" type="text" placeholder="Nome">
      <input v-if="showSignup" v-model="user.lastName" name="lastName" type="text" placeholder="Sobrenome">
      <input v-model="user.email" name="email" type="text" placeholder="E-mail">
      <input v-model="user.password" name="password" type="password" placeholder="Senha">
      <input v-if="showSignup" v-model="user.confirmPassword" 
        name="confirmPassword" type="password" placeholder="Confirme a Senha">

      <b-button v-if="showSignup" @click="signup">Ok</b-button>
      <b-button v-else @click="signin">Entrar</b-button>

      <div class="auth-links">
        <span v-if="showSignup">
          <a href @click.prevent="showSignup = !showSignup" @click="reset">Já é cadastrado? Acesse o Login!</a> 
        </span>
        <span class="auth-link-signup" v-else>
          <span class="link-signup" >
            <a href @click.prevent="showSignup = !showSignup" @click="reset">Não é cadastrado? Inscreva-se</a>
          </span>
          <!-- <span class="link-forgot-pass">
            <a href="">Recuperar senha</a>
          </span> -->
        </span>
      </div>
    </div>
  </div>  
</template>

<script>
import { baseApiUrl, showError, userKey, decodeToken } from '@/global'
import axios from 'axios'

export default {
  name: 'Auth',
  data: function() {
    return {
      showSignup: false,
      user: {}
    }
  },
  methods: {
    reset() {
      this.user = {}
    },
    signin() {
      axios.post(`${baseApiUrl}/login`, this.user)
        .then(res => {
          // decodificar token
          const data = decodeToken(res.headers['authorization'])
          data.accessToken = res.headers['authorization']
          data.refreshToken = res.data.refreshToken
          // setar usuario na store
          this.$store.commit('setUser', data)
          // setar dados do usuario no localStorage
          localStorage.setItem(userKey, JSON.stringify(data))
          // ir para a dashboard
          this.$router.push({ path: '/' })
        })
        .catch(showError)
    },
    signup() {
      axios.post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.user = {}
          this.showSignup = false
        })
        .catch(showError)
    }
  }
}
</script>

<style>
  .auth-content{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .auth-modal {
    background-color: #FFF;
    width: 350px;
    padding: 35px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .auth-title {
    font-size: 1.5rem;
    font-weight: 100;
    margin-top: 10px;
    margin-bottom: 15px;
  }

  .auth-modal input {
    border: 1px solid #BBB;
    width: 100%;
    margin-bottom: 15px;
    padding: 3px 8px;
    outline: none;
  }

  .auth-modal button {
    align-self: flex-end;
    background-color: #2460ae;
    color: #FFF;
    padding: 5px 15px;
  }

  /* .auth-modal a {
    margin-top: 35px;
  } */

  .auth-links {
    margin-top: 25px;
  }

  .auth-link-signup {    
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .link-signup, .link-forgot-pass {
    align-self: left;
    padding-bottom: 10px; 
  } 

  .auth-modal hr {
    border: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(to right,
      rgba(120,120,120,0), 
      rgba(120,120,120,0.75), 
      rgba(120,120,120,0) 
    );
  }
  
</style>