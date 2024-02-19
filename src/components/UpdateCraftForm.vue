<script setup lang="ts">
import { defineProps, reactive } from 'vue';
import { EditCraft } from '@/types/Craft';
import { gql } from '@apollo/client/core';
import { useMutation } from '@apollo/client';
const props = defineProps<{
  craft: EditCraft;
}>();
console.log(props);

const updateFields = reactive({
  ...props.craft,
});

const updateMutation = gql`
  mutation (
    $name: String
    $type: String
    $brand: String
    $price: String
    $age: Int
    $id: ID!
  ) {
    updateCraft(
      name: $name
      type: $type
      brand: $brand
      price: $price
      age: $age
      id: $id
    ) {
      id
      name
      type
      brand
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
// TODO: Fix ts err
// @ts-expect-error
const { mutation: updateCraft, onError } = useMutation(updateMutation, () => {
  return {
    variables: {
      id: updateFields.id,
      name: updateFields.name,
      type: updateFields.__typename,
      age: Number(updateFields.age),
      price: updateFields.price,
    },
    optimisticResponse: {
      updateCraft: {
        ...updateFields,
      },
    },
  };
});

onError(() => {
  emit('error');
});

const emit = defineEmits(['close', 'updated', 'error']);

async function handleSubmit() {
  emit('close');
  await updateCraft();
  emit('updated');
}
</script>
<template>
  <h1>Update Craft {{ craft.name }}</h1>

  <form @submit.prevent>
    <div class="form-field">
      <label for="craftName">Name</label>
      <input type="text" id="craftName" v-model="updateFields.name" />
      <label for="craftType">Type</label>
      <input type="text" id="craftType" v-model="updateFields.__typename" />
      <label for="craftPrice">Price</label>
      <input type="number" id="craftPrice" v-model="updateFields.price" />
      <label for="craftAge">Age</label>
      <input type="number" id="craftAge" v-model="updateFields.age" />
    </div>
  </form>
  <button @click="emit('close')">Cancel</button>
  <button @click="handleSubmit()">Update</button>
</template>
<style>
.form-field {
  display: flex;
  flex-direction: column;
  width: 300px;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 auto;
}
</style>
