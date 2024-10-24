<template>
  <div class="w-full px-8">
    <div class="flex flex-row border-b-2 pb-1 gap-4">
      <!-- TABS SECTIONS DESKTOP -->
      <div
        class="flex-1 flex flex-col md:flex-wrap md:flex-row lg:gap-4 font-semibold"
      >
        <span
          v-for="(section, index) in sections"
          class="p-2 rounded-md flex-1 md:flex-none hover:text-white select-none hover:bg-slate-800 transition-all duration-200 active:bg-cyan-600 hover:cursor-pointer"
          :class="{
            'bg-slate-800 text-white text-center': section.isActive,
            'hidden md:block': !section.isActive
          }"
          @click="onSectionActive(index)"
        >
          {{  section.text }}
        </span>
      </div>

      <!-- SECTIONS MOBILE  -->
      <button ref="sectionsMenu" type="button" @click="onToggleClick">
        <VerticalMenu class="h-6 w-6 self-center block md:hidden" />
      </button>
      <div
        v-if="toggleMenu" 
        ref="floatingSections" 
        :style="floatingStyles"
        class="flex flex-col gap-2 text-white z-30 bg-slate-800 rounded-lg p-4"
        >
        <span
          v-for="(section, index) in sections"
          @click="onSectionActive(index)"
          class="w-full flex flex-row gap-4 rounded-md py-2 px-2 select-none hover:bg-slate-600 transition-all duration-200 active:bg-cyan-600 hover:cursor-pointer"
          :class="{
            'bg-cyan-600': section.isActive
          }"
        >
          {{  section.text }}
        </span>

      </div>
    </div>

    <div>
      <slot name="body" :activeSection="getActiveSection()">Body</slot>
    </div>

    <div class="border-t-2 pt-2">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useFloating, offset, hide, flip, autoUpdate } from '@floating-ui/vue';
import VerticalMenu from '@/icons/VerticalMenu.vue';

interface Props {
  sections: {name:string, text: string; isActive: boolean}[]
}

const props = defineProps<Props>()

const sections = reactive(props.sections);

const onSectionActive = (index: any) => {
  for (const section of sections) {
    section.isActive = false;
  }
  sections[index].isActive = true;
}

const getActiveSection = () => {
  return sections.find(section => section.isActive);
}

const sectionsMenu = ref(null);
const floatingSections = ref(null);
const toggleMenu = ref(false)

const { floatingStyles } = useFloating(sectionsMenu, floatingSections, {
  placement: 'bottom-end',
  middleware: [offset(5), hide(), flip()],
  whileElementsMounted: autoUpdate,
});

const onToggleClick = () => {
  toggleMenu.value = !toggleMenu.value;
}

onClickOutside(sectionsMenu, () => {
  toggleMenu.value = false
})
</script>