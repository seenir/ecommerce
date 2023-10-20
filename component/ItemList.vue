<template>
    <div class="item-list">
        <!-- <button @click="asyncData">Refresh</button> -->
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.price }}</td>
            <td>
              <button @click="deleteItem(item.id)">Delete</button>
  
            </td>
            <td>
              <button @click="editItem(item)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="editingItem">
        <h3>Edit Item</h3>
        <input v-model="editingItem.name" placeholder="Name" /><br />
        <input v-model="editingItem.description" placeholder="Description" /><br />
        <input v-model="editingItem.price" placeholder="Price" /><br />
        <button @click="saveEdit(editingItem)">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
      <div  class="custom-toast-2" ref="customToast-2">
        Data Deleted Successfully
      </div>
      <div class="custom-toast-3" ref="customToast-3">
        Data Updated Successfully
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [],
        editingItem: null,
        ToastDelete: false,
        ToastUpdate: false,
      };
    },
    async created() {
      await this.asyncData();
      this.refreshInterval = setInterval(this.asyncData, 6000);
    },
    
    methods: {
      
      async asyncData() {
        try {
          const response = await fetch("/api/getData");
          const items = await response.json();
          this.items = items;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
      async deleteItem(itemId) {
        try {
          await fetch(`/api/deleteData?itemId=${itemId}`, {
            method: 'DELETE',
          });
          this.items = this.items.filter(item => item.id !== itemId);
          this.asyncData();
          this.showToastDeleted();
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      },
      editItem(item) {
        this.editingItem = { ...item };
      },
      async saveEdit(editingItem) {
        console.log("test", editingItem);
              try {
                  const response = await fetch(`/api/updateData?itemId=${editingItem.id}&name=${editingItem.name}&description=${editingItem.description}&price=${editingItem.price}`, {
                      method: 'PUT', // You can use PUT or POST based on your preference
                  });

                  if (response.ok) {
                      console.log('Item updated successfully');
                      this.asyncData();
                      this.showToastUpdated();
                      this.editingItem = null;
                  } else {
                      console.error('Error updating item');
                  }
              } catch (error) {
                  console.error('Error updating item:', error);
              }
      },
      cancelEdit() {
        this.editingItem = null; // Reset editing state
      },
      showToastUpdated() {
        const customToast3 = document.querySelector('.custom-toast-3'); // Assuming you have a class 'custom-toast'
        customToast3.classList.add('show-toast-3');

        setTimeout(() => {
          customToast3.classList.remove('show-toast-3');
        }, 3000); // Toast will disappear after 3 seconds
      },
      showToastDeleted() {
        const customToast2 = document.querySelector('.custom-toast-2'); // Assuming you have a class 'custom-toast'
        customToast2.classList.add('show-toast-2');
        

        setTimeout(() => {
          customToast2.classList.remove('show-toast-2');
        }, 3000); // Toast will disappear after 3 seconds
      },
      destroyed() {
    clearInterval(this.refreshInterval);
  },
    },
  };
  </script>
  
  <style scoped>
  .item-list {
    max-width: 800px;
    margin: 0 auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  th,
  td {
    padding: 10px 15px; /* Adjust padding for better spacing */
    text-align: left;
    border-bottom: 1px solid #ccc;
  }
  
  thead {
    background-color: #f7f7f7;
  }
  
  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  /* Hover effect on rows */
  tbody tr:hover {
    background-color: #e0e0e0;
  }
  
  /* Style buttons */
  button {
    padding: 5px 10px;
    margin: 5px;
    border: none;
    cursor: pointer;
    background-color: #007bff; /* Blue color for buttons */
    color: #fff;
    border-radius: 4px;
  }
  
  button:hover {
    background-color: #0056b3; /* Darker blue color on hover */
  }
  
  /* Style input fields */
  input {
    padding: 8px;
    margin-bottom: 10px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  /* Adjust styles for the edit form */
  .item-list div {
    margin-top: 20px;
  }
  
  .item-list h3 {
    margin-bottom: 10px;
    font-size: 1.2em;
  }
  
  /* Add some space between buttons in the edit form */
  .item-list button + button {
    margin-left: 10px;
  }

  .custom-toast-2 {
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

.show-toast-2 {
  opacity: 1;
}

.custom-toast-3 {
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

.show-toast-3 {
  opacity: 1;
}
  </style>
  
  