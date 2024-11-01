<template>
  <div class="flex flex-col gap-2">
    <label
      :for="name"
      class="text-cyan-950 font-semibold text-sm"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-red-400 font-semibold text-sm"
        >*</span
      >
    </label>
    <div class="flex flex-col">
      <div
        ref="selectInput"
        class="relative"
      >
        <!-- Este tendra la etiqueta a mostrar -->
        <input
          :ref="ref"
          :id="id"
          :name="name"
          v-model="value"
          class="hidden"
          @input="handleChange"
        />

        <div
          id="optionLabelInput"
          name="optionLabelInput"
          class="block w-full text-sm border-2 h-auto border-gray-300 px-4 py-2 rounded-md text-cyan-900 hover:border-cyan-500 hover:cursor-pointer focus:outline-none focus:ring-0 disabled:bg-white"
          :class="inputTextClasses"
          :placeholder="placeholder"
          @click="onToggleClick"
        >
          <span
            v-if="optionLabelInput"
            class="w-full select-none"
            >{{ optionLabelInput }}</span
          >
          <span
            v-else
            class="italic text-gray-400 select-none"
            >{{ placeholder }}</span
          >
        </div>
        <div
          class="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
          @click="onToggleClick"
        >
          <ArrowDown
            class="fill-cyan-600 h-7 w-7 transition-all"
            :class="{
              'rotate-180': toggleMenu,
            }"
          />
        </div>

        <div
          v-if="toggleMenu"
          ref="floatingOptions"
          :style="floatingStyles"
          class="flex flex-col w-full min-w-[300px] max-w-[500px] gap-1 z-30 bg-white rounded-lg p-2 border-2 shadow-lg"
        >
          <input
            v-if="optionFilter"
            id="optionFilterInput"
            name="optionFilterInput"
            type="text"
            v-model="optionFilterInput"
            class="w-full text-sm border-2 border-gray-300 px-4 py-2 rounded-md text-cyan-900 placeholder:italic hover:border-cyan-500 focus:outline-none focus:ring-0"
            placeholder="Buscar"
            @input="handleFilterOptions"
            @keydown="handleKeydown"
            autofocus
          />
          <div class="text-md max-h-[300px] overflow-y-auto">
            <div v-if="optionItems.length">
              <div
                v-for="(option, index) in optionItems"
                @click="handleSelectOption(option)"
                :key="option[optionLabel] + index"
                class="mx-1 hover:cursor-pointer hover:bg-cyan-600 p-2 rounded-md hover:text-white"
              >
                <span>{{ getOptionLabel(option) }}</span>
              </div>
              <hr class="mx-1" />
            </div>
            <div v-else>
              <span class="select-none">No se encontraron resultados</span>
            </div>
          </div>
        </div>
      </div>
      <span
        v-if="showErrors"
        class="text-[14px] text-red-400 mx-4"
      >
        &nbsp; {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useField } from 'vee-validate';
import { useFloating, hide, autoUpdate, flip } from '@floating-ui/vue';
import { onClickOutside } from '@vueuse/core';
import ArrowDown from '@/icons/ArrowDown.vue';

interface Props {
  id: string;
  name: string;
  label: string;
  options: any[];
  optionLabel?: string;
  optionValue?: string;
  optionFilter?: string;
  autofocus?: boolean;
  modelValue?: string;
  placeholder?: string;
  showErrors?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: 'Seleccione una opción',
  optionLabel: '',
  optionValue: '',
  optionFilter: '',
  showErrors: true,
  autofocus: false,
  required: false,
});

/// Validaciones
const { value, errorMessage, handleChange, setValue } = useField(() => props.name, undefined, {
  syncVModel: true,
});

/// Menu Flotante
const selectInput = ref(null);
const floatingOptions = ref(null);

const { floatingStyles } = useFloating(selectInput, floatingOptions, {
  placement: 'bottom-start',
  strategy: 'fixed',
  middleware: [hide()],
  whileElementsMounted: autoUpdate,
});

/// Toggle events

const toggleMenu = ref(false);
const onToggleClick = () => {
  toggleMenu.value = !toggleMenu.value;
};

onClickOutside(selectInput, () => {
  toggleMenu.value = false;
});


const optionItems = ref(props.options);
const optionFilterInput = ref('');
const optionLabelInput = ref('');

onMounted(()=> {
  setSelectedOption()
})

const setSelectedOption = () => {
  console.log(props)
  if(props.options.length > 0){
    let selectedOption;
    if (props.optionValue !== '') {
      selectedOption = optionItems.value.find(option => option[props.optionValue] === value.value);
      if(selectedOption) optionLabelInput.value = selectedOption[props.optionLabel];
    } else {
      selectedOption = optionItems.value.find(option => option === value);
      if(selectedOption) optionLabelInput.value = selectedOption;
    }
  }
}

const getOptionLabel = (option: any) => {
  if (props.optionLabel !== '') {
    return option[props.optionLabel];
  } else {
    return option;
  }
};

const optionFilterItems = computed(() => {
  if (props.optionFilter === '') return props.options;
  return props.options.map((option) => {
    return {
      ...option,
      filterBy: option[props.optionFilter]
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''),
    };
  });
});

const handleFilterOptions = (event: any) => {
  // if (event.inputType === 'deleteContentBackward') return;
  if (event.target.value) optionItems.value = props.options;
  if (props.optionFilter !== '') {
    optionItems.value = optionFilterItems.value.filter((option: any) =>
      option.filterBy.includes(event.target.value.toLowerCase()),
    );
  }
};

const handleKeydown = (event: any) => {
  //enter selecciona
  //escape sale y no selecciona
  if (event.key === 'Enter') {
    event.preventDefault();
    //Oculta dropdown
  }

  if (event.key === 'Escape') {
    //Oculta dropdown
  }
};

const handleSelectOption = (option: any) => {
  optionLabelInput.value = option;

  if (props.optionLabel !== '') {
    optionLabelInput.value = option[props.optionLabel];
  } else {
    optionLabelInput.value = option;
  }
  if (props.optionValue !== '') {
    setValue(option[props.optionValue]);
  } else {
    setValue(option);
  }

  onToggleClick();
};


const inputTextClasses = computed(() => {
  return {
    'border-red-400 hover:border-red-400 focus:border-red-400 focus:outline-none focus:ring-0':
      errorMessage.value,
  };
});
</script>
