<template>
  <!-- <Transition name="modal-fade"> -->
  <div
    class="fixed inset-0 flex justify-center items-center bg-slate-600 bg-opacity-80 z-20"
    role="dialog"
    aria-labelledby="modalTitle"
    aria-describedby="modalDescription"
  ></div>

  <div class="fixed inset-0 z-20 overflow-y-auto">
    <div class="flex h-screen justify-items-center items-center justify-center">
      <div class="w-10/12 max-w-[500px] md:w-[500px] h-fit bg-white my-8 rounded-lg">
        <div class="flex flex-col">
          <header
            id="modalTitle"
            class="flex flex-row justify-between px-4 py-4 border-b-2 text-xl font-semibold"
          >
            <div class="w-full text-center">
              <slot name="header">
                {{ title }}
              </slot>
            </div>
            <Close
              aria-label="Close modal"
              class="fill-cyan-600 hover:cursor-pointer hover:fill-cyan-700"
              @click="$emit('close')"
            />
          </header>

          <section
            id="modalDescription"
            class="px-4 py-4"
          >
            <slot name="body">
              {{ message }}
            </slot>
          </section>

          <footer
            v-if="slots.footer"
            class="flex flex-row justify-end border-t-2 px-4 py-2"
          >
            <slot name="footer">
              <div class="flex flex-row justify-end gap-4">
                <button
                  type="button"
                  class="btn-secondary"
                  @click="$emit('close')"
                  aria-label="Close modal"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  class="btn-primary"
                  @click="$emit('accept')"
                  aria-label="Accept modal"
                >
                  Aceptar
                </button>
              </div>
            </slot>
          </footer>
        </div>
      </div>
    </div>
  </div>
  <!-- </Transition> -->
</template>

<script lang="ts" setup>
import { useSlots } from 'vue';

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
const slots = useSlots();
</script>

<style scoped>
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease-in;
}
</style>
