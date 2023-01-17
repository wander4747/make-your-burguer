<template>
  <div id="burger-table" v-if="state.burgers.length > 0">
    <div>
      <div id="burger-table-heading">
        <div class="order-id">#:</div>
        <div>Cliente:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>
        <div>Ações:</div>
      </div>
    </div>
    <div id="burger-table-rows">
      <div class="burger-table-row" v-for="(burger, key) in state.burgers" :key="burger.id">
        <div class="order-number">{{ burger.id }}</div>
        <div>{{ burger.name }}</div>
        <div>{{ burger.bread }}</div>
        <div>{{ burger.meat }}</div>
        <div>
          <ul v-for="(optional, index) in burger.optionals" :key="index">
            <li>{{ optional }}</li>
          </ul>
        </div>
        <div>
          <select name="status" class="status" @change="updateBurger($event, burger.id)">
            <option :value="s.tipo" v-for="s in state.status" :key="s.id" :selected="burger.status == s.type">
              {{ s.type }}
            </option>
          </select>
          <button class="delete-btn" @click="deleteBurger(burger.id, key)">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h2>Não há pedidos no momento!</h2>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import { reactive, onMounted } from 'vue'
import services from '@/services'

export default {
  name: "Dashboard",
  setup() {
    const state = reactive({
      burgers: [],
      status: []
    })

    async function getOrders() {
      await services.orders.get().then((data) => {
        state.burgers = data.data
        getStatus()
      }).catch(err => {
        Swal.fire({
          title: 'OPPS',
          text: err,
          icon: 'error',
        });
      })
    }

    async function getStatus() {
      await services.status.get().then((data) => {
        state.status = data.data
      }).catch(err => {
        Swal.fire({
          title: 'OPPS',
          text: err,
          icon: 'error',
        });
      })
    }

    async function updateBurger(event, id) {
      const option = event.target.value;

      const dataJson = JSON.stringify({status: option});

      await services.burguers.patch(id, dataJson).then((data) => {
        state.message = "Pedido realizado com sucesso!"
      }).catch(err => {
        Swal.fire({
          title: 'OPPS',
          text: err,
          icon: 'error',
        });
      })
    }

    async function deleteBurger(id, key) {
      await Swal.fire({
        title: 'Atenção?',
        text: "Você quer mesmo cancelar esse pedido?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          services.burguers.delete(id).then((data) => {
            state.burgers.splice(key, 1);
            Swal.fire({
              title: 'OK',
              text: "Pedido cancelado com sucesso",
              icon: 'success',
            });
          }).catch(err => {
            Swal.fire({
              title: 'OPPS',
              text: err,
              icon: 'error',
            });
          })
        }
      })
    }
    
    onMounted(() => {
      getOrders()
    })

    return {
      state,
      updateBurger,
      deleteBurger
    }
  }
}
</script>

<style scoped>
#burger-table {
  max-width: 1200px;
  margin: 0 auto;
}

#burger-table-heading,
#burger-table-rows,
.burger-table-row {
  display: flex;
  flex-wrap: wrap;
}

#burger-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
}

.burger-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #CCC;
}

#burger-table-heading div,
.burger-table-row div {
  width: 19%;
}

#burger-table-heading .order-id,
.burger-table-row .order-number {
  width: 5%;
}

select {
  padding: 12px 6px;
  margin-right: 12px;
}

.delete-btn {
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

.delete-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>