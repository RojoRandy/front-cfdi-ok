<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 my-4">
    <TextInput id="mailServer" name="mailServer" label="Servidor"  />
    <TextInput id="email" name="email" label="Correo Electrónico"  />
    <TextInput id="password" name="password" type="password" label="Contraseña"  />
  </div>
</template>

<script setup lang="ts">
import TextInput from '@/modules/common/components/TextInput.vue';

</script>