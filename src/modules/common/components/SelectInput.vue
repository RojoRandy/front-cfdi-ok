<template>
  <div class="flex flex-col gap-2">
    <label
      :for="name"
      class="text-theme-text font-semibold text-sm"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-red-500 font-semibold text-sm"
        >*</span
      >
    </label>
    <div class="flex flex-col">
      <div
        ref="selectInput"
        class="relative"
      >
        <div
          tabindex="0"
          id="optionLabelInput"
          name="optionLabelInput"
          class="w-full text-sm border-2 h-auto px-4 py-2 rounded-md 
          text-theme-text 
          focus:border-2 focus:border-theme-interface"
          :class="inputTextClasses"
          :placeholder="placeholder"
          @click="onToggleClick"
          @keypress="onToggleClick"
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
          class="absolute inset-y-0 end-0 flex items-center z-10 px-3 rounded-e-md"
          :class="{
            'cursor-pointer focus:outline-none focus:border-theme-interface': !disabled,
            'cursor-default': disabled
          }"
          @click="onToggleClick"
        >
          <ArrowDown
            class="fill-theme-icons h-7 w-7 transition-all"
            :class="{
              'rotate-180': toggleMenu,
              'cursor-default': disabled
            }"
          />
        </div>

        <div
          v-if="toggleMenu"
          ref="floatingOptions"
          :style="floatingStyles"
          class="z-30 flex flex-col w-auto min-w-[300px] max-w-[500px] gap-1 bg-white rounded-lg p-2 border-2 shadow-lg"
        >
          <input
            ref="optionFilterInputRef"
            v-if="optionFilter"
            id="optionFilterInput"
            name="optionFilterInput"
            type="text"
            v-model="optionFilterInput"
            class="w-full text-sm border-2 px-4 py-2 rounded-md text-theme-text 
            placeholder:italic 
            hover:border-theme-interface 
            focus:outline-none focus:ring-0"
            placeholder="Buscar"
            @input="handleFilterOptions"
            @keydown="handleKeydown"
          />
          <div class="text-md max-h-[300px] overflow-y-auto">
            <div v-if="optionItems.length">
              <div
                v-for="(option, index) in optionItems"
                @click="handleSelectOption(option)"
                :key="getOptionLabel(option) + index"
                class="mx-1 hover:cursor-pointer hover:bg-theme-interface p-2 rounded-md hover:text-theme-interface-foreground"
              >
                <span>{{ getOptionLabel(option) }}</span>
              </div>
            </div>
            <div v-else>
              <span class="select-none">No se encontraron resultados</span>
            </div>
          </div>
        </div>
      </div>
      <span
        v-if="showErrors"
        class="text-[14px] text-theme-destructive mx-4"
      >
        &nbsp; {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, watch, watchEffect } from 'vue';
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
  modelValue?: string;
  placeholder?: string;
  showErrors?: boolean;
  required?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: 'Seleccione una opción',
  optionLabel: '',
  optionValue: '',
  optionFilter: '',
  showErrors: true,
  required: false,
  disabled: false
});

const emit = defineEmits<{
  change: [option: any],
  'update:modelValue': [option: any]
}>()

/// Validaciones
const { value, errorMessage, setValue } = useField(() => props.name);

/// Menu Flotante
const selectInput = ref(null);
const floatingOptions = ref(null);

const { floatingStyles } = useFloating(selectInput, floatingOptions, {
  placement: 'bottom-start',
  strategy: 'fixed',
  middleware: [hide(), flip()],
  whileElementsMounted: autoUpdate,
});

/// Toggle events

const toggleMenu = ref(false);
const onToggleClick = () => {
  if(props.disabled) return;
  toggleMenu.value = !toggleMenu.value;
};

onClickOutside(selectInput, () => {
  toggleMenu.value = false;
});


const optionItems = ref(props.options);
const optionFilterInput = ref('');
const optionFilterInputRef = useTemplateRef('optionFilterInputRef');
const optionLabelInput = ref('');

watch(()=>props.options, (newVal, oldVal)=>{
  optionItems.value = newVal
})


const setSelectedOption = () => {
  if(props.options.length > 0){
    let selectedOption;
    if (props.optionValue !== '') {
      selectedOption = props.options.find(option => option[props.optionValue] === value.value);
      if(selectedOption) optionLabelInput.value = selectedOption[props.optionLabel];
    } else {
      selectedOption = props.options.find(option => option === value);
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

  if (['Escape', 'Tab'].includes(event.key)) {
    //Oculta dropdown
    onToggleClick();
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

  emit('change', option);
  emit('update:modelValue', value)
  onToggleClick();
};


const inputTextClasses = computed(() => {
  return {
    'border-theme-destructive hover:border-theme-destructive focus:border-theme-destructive focus:outline-none focus:ring-0':
      errorMessage.value,
    'hover:border-theme-interface hover:cursor-pointer focus:outline-none focus:ring-0 bg-white disabled:bg-white': !props.disabled,
    'bg-disabled hover:cursor-default': props.disabled
  };
});


watchEffect(()=> {
  setSelectedOption()
  
  if(toggleMenu.value) optionFilterInputRef.value?.focus()
})
</script>
