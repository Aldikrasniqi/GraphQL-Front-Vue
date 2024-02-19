<script setup lang="ts">
import { defineProps } from 'vue';
import { Craft } from '@/types/Craft';
defineProps<{
  craft: Craft;
}>();
</script>

<template>
  <li :class="craft.owner ? 'owned' : 'for-sale'">
    <router-link :to="`/craft/${craft.id}`">
      {{ craft.name }}
      <span v-if="craft.owner">
        is owned by {{ craft.owner.firstName }} {{ craft.owner.lastname }}</span
      >
      <span v-else>
        is available to buy and costs ${{ craft.price.toLocaleString('uk') }}
      </span>
    </router-link>
  </li>
</template>
<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 10px;
  border: 1px solid #ccc;
  margin: 10px 0;
  display: flex;
}
li {
  border: 1px solid black;
  border-radius: 6px;
  padding: 6px;
}
li.owned {
  background-color: rgb(218, 220, 218);
}
li.for-sale {
  font-weight: bold;
}
</style>
