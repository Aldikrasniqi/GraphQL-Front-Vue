<script lang="ts" setup>
import { gql } from '@apollo/client/core';
import { useQuery } from '@vue/apollo-composable';
import { useRoute } from 'vue-router';
import UpdateCraftForm from './UpdateCraftForm.vue';
import { computed, onMounted, ref } from 'vue';
const showModal = ref(false);
const router = useRoute();
const craftQuery = gql`
  query ($id: ID) {
    Craft(id: $id) {
      name
      type
      price
      age
      owner {
        id
        firstName
        lastName
      }
    }
  }
`;
const { result } = useQuery(craftQuery, { id: router.params.id });
const data = computed(() => result.value?.Craft);
console.log(data.value);
onMounted(() => {
  console.log('CraftView mounted');
  console.log(showModal.value);
});
console.log(showModal.value);
</script>

<template>
  <h1>Welcome to the Jakes store</h1>
  <h2>{{ data.name }} made by {{ data.type }}</h2>
  <span>
    This craft is {{ data.age }} years old and costs
    {{ data.price.toLocaleString('uk') }}$
  </span>
  <p v-if="data.owner">
    This craft is owned by {{ data.owner.firstName }} {{ data.owner.lastName }}
  </p>
  <p v-else>This craft is available to buy</p>
  <button @click="showModal = !showModal">Update</button>
  <div v-if="showModal" class="modal">
    <div class="modal__inner">
        <UpdateCraftForm :craft="data" @close="showModal = !showModal" />
    </div>
  </div>
</template>
<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 700px;
  height: 400px;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 60px 10px rgba(0, 0, 0, 0.5);
}
.modal__inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 40px 20px 20px;
  height: 100%;
  overflow: auto;
}
</style>
