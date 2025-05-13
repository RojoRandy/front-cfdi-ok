<template>
  <div class="w-full bg-white rounded-lg shadow-md p-4">
    <h1>Clientes</h1>


    <div name="actions" class="w-full bg-gray-200 rounded-md p-2">
      <button class="btn-primary">Agregar nuevo cliente</button>
    </div>

    <div class="flex flex-row mt-4 gap-2">
      <div name="client-list" class="flex flex-col gap-2 basis-1/3 bg-gray-200 rounded-md p-4">
        <input type="text" placeholder="Buscar" class="cfdi-input" />
        <ClientCard />
        <ClientCard />
        <ClientCard />
        <ClientCard />
        <ClientCard />
      </div>
  
      <div name="client-details" class="flex-1 basis-2/3 bg-gray-200 rounded-md">
        <ClientDetails />  
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ClientCard from '../components/ClientCard.vue';
import ClientDetails from '../components/ClientDetails.vue';

</script>