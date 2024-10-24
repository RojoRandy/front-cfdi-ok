<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 my-4">
    <TextInput id="rfc" name="rfc" label="R.F.C"  />
    <TextInput id="fiscalName" name="fiscalName" label="Nombre fiscal"  />
    <TextInput id="fiscalRegime" name="fiscalRegime" label="Régimen Fiscal"  />
  </div>
</template>

<script setup lang="ts">
import TextInput from '@/modules/common/components/TextInput.vue';

</script>