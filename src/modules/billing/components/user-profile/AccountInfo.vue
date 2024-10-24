<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 my-4">
    <TextInput id="email" name="email" label="Correo Electrónico"  />
    <button type="button" class="btn-primary md:mt-8 md:mb-5">Cambiar contraseña</button>
  </div>
</template>

<script setup lang="ts">
import TextInput from '@/modules/common/components/TextInput.vue';

</script>