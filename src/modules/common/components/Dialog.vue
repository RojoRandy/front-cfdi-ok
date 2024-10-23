<template>
  <Transition name="dialog-fade">
    <div
      class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-cyan-950 bg-opacity-80 z-20"
      role="dialog"
      aria-labelledby="dialogTitle"
      aria-describedby="dialogDescription"
    >
      <div
        class="dialog-container w-10/12 md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-cyan-950 shadow-md flex flex-col"
      >
        <header
          id="dialogTitle"
          class="flex flex-row justify-between px-4 py-4 border-b-2 text-xl font-semibold"
        >
          {{ title }}
          <Close
            aria-label="Close dialog"
            class="fill-cyan-600 hover:cursor-pointer hover:fill-cyan-700"
            @click="$emit('close')"
          />
        </header>

        <section
          id="dialogDescription"
          class="px-4 py-4"
        >
          {{ message }}
        </section>

        <footer class="flex flex-row justify-end border-t-2 px-4 py-2">
          <slot name="footer">
            <div class="flex flex-row justify-end gap-4">
              <button
                type="button"
                class="btn-secondary"
                @click="$emit('close')"
                aria-label="Close dialog"
              >
                Cerrar
              </button>
              <button
                type="button"
                class="btn-primary"
                @click="$emit('accept')"
                aria-label="Accept dialog"
              >
                Aceptar
              </button>
            </div>
          </slot>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import Close from '@/icons/CloseIcon.vue';

interface Props {
  title?: string;
  message?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Titulo',
  message: 'Mensaje',
});

defineEmits(['close', 'accept']);
</script>

<style scoped>
.dialog-fade-enter,
.dialog-fade-leave-to {
  opacity: 0;
}

.dialog-fade-enter,
.dialog-fade-leave-active {
  transition: opacity 0.3s ease-in;
}
</style>
