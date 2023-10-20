<template>
   <form class="custom-form" @submit.prevent="handleSubmit">
    
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="formData.name" required />
    </div>
    <div>
      <label for="description">Description:</label>
      <textarea id="description" v-model="formData.description" required></textarea>
    </div>
    <div>
      <label for="price">Price:</label>
      <input type="number" id="price" v-model="formData.price" required />
    </div>
    <button type="submit">Submit</button>
    <div class="custom-toast" ref="customToast">
    Data Added Successfully
  </div>
  </form>
  <br/>
  <div>
    <h1>DataList </h1>
    <ItemList></ItemList>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import ItemList from '../component/ItemList.vue';

const formData = ref({
  name: '',
  description: '',
  price: null
});

const showToast = () => {
  const customToast = document.querySelector('.custom-toast'); // Assuming you have a class 'custom-toast'
  customToast.classList.add('show-toast');

  setTimeout(() => {
    customToast.classList.remove('show-toast');
  }, 3000); // Toast will disappear after 3 seconds
};

const handleSubmit = async () => {
  try {
    const response = await axios.post('/api/postFormData', {
      name: formData.value.name,
      description: formData.value.description,
      price: formData.value.price,
    });
    console.log('Item added:', formData.value);
     // Clear the form fields after successful submission
    formData.value.name = '';
    formData.value.description = '';
    formData.value.price = '';
    console.log('Item added:', response);
    showToast();
    
  } catch (error) {
    console.error('Error adding item:', error);
  }
}

</script>


<style scoped>
.custom-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-form div {
  margin-bottom: 15px;
}

.custom-form label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.custom-form input,
.custom-form textarea {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.custom-form button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.custom-form button:hover {
  background-color: #0056b3;
}

.custom-toast {
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  opacity: 0;
  transition: opacity 0.3s;
}

.show-toast {
  opacity: 1;
}

</style>
