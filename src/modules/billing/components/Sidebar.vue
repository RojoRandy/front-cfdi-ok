
<template>
  <div
    class="fixed z-20 inset-0 flex justify-center items-center bg-slate-600 bg-opacity-80 hover:cursor-pointer"
    :class="{'hidden': !visible}"
    role="dialog"
    aria-labelledby="modalTitle"
    aria-describedby="modalDescription"
    @click="$emit('close')"
  ></div>
  <aside 
  class="fixed left-0 z-20 h-screen transition-all ease-in-out duration-300 drop-shadow-lg"
    :class="{
      'w-0 md:w-16': !visible,
      'w-64': visible
    }"
    aria-label="Sidebar">
    <div 
      class="h-full flex flex-col overflow-y-auto bg-cyan-600 py-2"
      >
      <SidebarMenuItem 
        v-for="item in menuItems" 
        :icon="item.icon"
        :text="item.text"
        :route-name="item.routeName"  
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import ArrowLeft from '@/icons/ArrowLeft.vue';
import SidebarMenuItem from './SidebarMenuItem.vue';
import { computed } from 'vue';
import type { SidebarItemProps } from '../interfaces/sidebar.interface';
import MenuDashboard from '@/icons/DashboardIcon.vue';
import MenuBilling from '@/icons/BillingIcon.vue';
import MenuPayments from '@/icons/PaymentsIcon.vue';
import MenuClients from '@/icons/ClientsIcon.vue';
import MenuProducts from '@/icons/ProductsIcon.vue';

interface Props {
  visible: boolean;
}

withDefaults(defineProps<Props>(), {
  visible: false
})

const emits = defineEmits(['close']);

const menuItems = computed<SidebarItemProps[]>(()=> {
  return [
    {
      icon: MenuDashboard,
      text: 'Dashboard',
      routeName: 'dashboard'
    },
    {
      icon: MenuBilling,
      text: 'Facturar',
      routeName: 'billing'
    },
    {
      icon: MenuPayments,
      text: 'Pagos',
      routeName: 'payments'
    },
    {
      icon: MenuClients,
      text: 'Clientes',
      routeName: 'clients'
    },
    {
      icon: MenuProducts,
      text: 'Productos',
      routeName: 'products'
    },
  ]
})
</script>