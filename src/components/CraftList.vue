<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';
import { computed, onMounted } from 'vue';
import Craft from './Craft.vue';
const craftQuery = gql`
  query {
    Crafts {
      edges {
        name
        id
        type
        price
        age
        owner {
          id
          firstName
        }
      }
    }
  }
`;
const { result } = useQuery(craftQuery);
const data = computed(() => result.value?.Crafts.edges);

onMounted(() => {
  // console.log(data);
});
</script>

<template>
  <h1>Welcome to the Apollo GraphQL + Vue 3 + Vite app with TypeScript</h1>
  <h2>Currect Crafts</h2>
  <ul>
    <Craft v-for="craft in data" :key="craft.id" :craft="craft" />
  </ul>
</template>
