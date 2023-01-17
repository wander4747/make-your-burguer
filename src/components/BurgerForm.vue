<template>
  <Message :text="state.message" v-show="state.message" />
  <div>
    <form id="burger-form" method="POST" @submit="createBurger">
      <div class="input-container">
        <label for="name">Nome do cliente:</label>
        <input type="text" id="name" name="name" v-model="state.name" placeholder="Digite o seu nome">
      </div>
      <div class="input-container">
        <label for="bread">Escolha o pão:</label>
        <select name="bread" id="bread" v-model="state.bread">
          <option value="">Selecione o seu pão</option>
          <option v-for="bread in state.breads" :key="bread.id" :value="bread.type">{{ bread.type }}</option>
        </select>
      </div>
      <div class="input-container">
        <label for="carne">Escolha a carne do seu Burger:</label>
        <select name="meat" id="meat" v-model="state.meat">
          <option value="">Selecione o tipo de carne</option>
          <option v-for="meat in state.meats" :key="meat.id" :value="meat.type">{{ meat.type }}</option>
        </select>
      </div>
      <div id="opcionais-container" class="input-container">
        <label id="opcionais-title" for="opcionais">Selecione os opcionais:</label>
        <div class="checkbox-container" v-for="optional in state.optionalData" :key="optional.id">
          <input type="checkbox" name="optionals" v-model="state.optionals" :value="optional.type">
          <span>{{ optional.type }}</span>
        </div>
      </div>
      <div class="input-container">
        <input class="submit-btn" type="submit" value="Criar meu Burger!">
      </div>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import Message from '@/components/Message'
import { reactive, onMounted } from 'vue'
import services from '@/services'

export default {
  name: "BurgerForm",
  components: {
    Message,
  },
  setup () {
    const state = reactive({
      breads: null,
      meats: null,
      optionalData: null,
      name: null,
      bread: null,
      meat: null,
      optionals: [],
      status: "Solicitado",
      message: null
    })

    function clearFields() {
      setTimeout(() => state.message = "", 2000)
      state.name = ""
      state.meat = ""
      state.bread = ""
      state.optionals = []
    }

    async function getIngredients() {
      await services.ingredients.get().then((data) => {
        state.breads = data.data.breads
        state.meats = data.data.meats
        state.optionalData = data.data.optionals
      }).catch(err => {
        Swal.fire({
          title: 'OPPS',
          text: err,
          icon: 'error',
        });
      })
    }

    async function createBurger(e) {
      e.preventDefault();

      const data = {
        name: state.name,
        meat: state.meat,
        bread: state.bread,
        optionals: Array.from(state.optionals),
        status: "Solicitado",
      }
      
      const dataJson = JSON.stringify(data)    

      await services.burguers.store(dataJson).then((data) => {
        state.message = "Pedido realizado com sucesso!"
        clearFields()
      }).catch(err => {
        Swal.fire({
          title: 'OPPS',
          text: err,
          icon: 'error',
        });
      })
    }

    onMounted(() => {
      getIngredients()
    })

    return {
      state, 
      createBurger
    }
  }
}
</script>

<style scoped>
  #burger-form {
    max-width: 400px;
    margin: 0 auto;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  label {
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;;
    padding: 5px 10px;
    border-left: 4px solid #fcba03;
  }

  input, select {
    padding: 5px 10px;
    width: 300px;
  }

  #opcionais-container {
    flex-direction: row;
    flex-wrap: wrap;
  }

  #opcionais-title {
    width: 100%;
  }

  .checkbox-container {
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
  }

  .checkbox-container span,
  .checkbox-container input {
    width: auto;
  }

  .checkbox-container span {
    margin-left: 6px;
    font-weight: bold;
  }

  .submit-btn {
    background-color: #222;
    color:#fcba03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
  }

  .submit-btn:hover {
    background-color: transparent;
    color: #222;
  }
</style>