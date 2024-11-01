<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 my-4">
    <TextInput id="codigoPostal" name="codigoPostal" label="Código Postal" required />
    <TextInput id="calle" name="calle" label="Calle"  />
    <TextInput id="numExt" name="numExt" label="Número Exterior"  />
    <TextInput id="numInt" name="numInt" label="Número Interior"  />
    <TextInput id="colonia" name="colonia" label="Colonia"  />
    <TextInput id="pais" name="pais" label="País"  />
    <TextInput id="estado" name="estado" label="Estado"  />
    <TextInput id="municipio" name="municipio" label="Municipio"  />
    <TextInput id="localidad" name="localidad" label="Localidad"  />
    <TextInput id="referencias" name="referencias" label="Referencias"  />
  </div>
</template>

<script setup lang="ts">
import TextInput from '@/modules/common/components/TextInput.vue';

</script>