<template>
  <div>
    <h1>E-commerce platform - Product Detail </h1>
    <CreateItemForm />
  </div>
</template>

<script setup>
import CreateItemForm from './component/CreateItemForm.vue';
import axios from 'axios';


const formData = ref({
  name: '',
  description: '',
  price: null
});
// import { createItem } from '~/api/createItem';

const handleSubmit = async () => {
  // You'll implement the API call here in the next step
      try {
        const response = await axios.post('/api/items', {
          name: formData.name,
          description: formData.description,
          price: formData.price,
        });
        console.log('Item added:', formData);
        console.log('Item added:', response);
      } catch (error) {
        console.error('Error adding item:', error);
      }

};
</script>
