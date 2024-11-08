<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 my-4">
    <TextInput id="certificate" name="certificate" label="Certificado"  />
    <TextInput id="publicKey" name="publicKey" label="Llave Pública"  />
    <TextInput id="password" name="password" type="password" label="Contraseña"  />
    <TextInput id="passwordConfirm" name="passwordConfirm" type="password" label="Confirmar contraseña"  />
  </div>
</template>

<script setup lang="ts">
import TextInput from '@/modules/common/components/TextInput.vue';

</script>