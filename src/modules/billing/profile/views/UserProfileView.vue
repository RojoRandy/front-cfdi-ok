<template>
  <div class="bg-white m-4 rounded-lg p-4 shadow-lg">
    <ProfileHeader />
  
    <TabSections 
      :sections="sections"
    >
    <template #body="bodyProps">
      <FiscalData v-if="bodyProps.activeSection!.name === 'FiscalData'" />
      <FiscalAddress v-else-if="bodyProps.activeSection!.name === 'FiscalAddress'"/>
      <AccountInfo v-else-if="bodyProps.activeSection!.name === 'AccountInfo'"/>
      <SendMails v-else-if="bodyProps.activeSection!.name === 'SendMails'"/>
      <DigitalStamp v-else-if="bodyProps.activeSection!.name === 'DigitalStamp'"/>
    </template>
    </TabSections>

  </div>
</template>

<script setup lang="ts">
import TabSections from '@/modules/common/components/TabSections.vue';
import ProfileHeader from '../components/ProfileHeader.vue';
import FiscalData from '../components/FiscalData.vue';
import FiscalAddress from '../components/FiscalAddress.vue';
import AccountInfo from '../components/AccountInfo.vue';
import SendMails from '../components/SendMails.vue';
import DigitalStamp from '../components/DigitalStamp.vue';
import { onMounted } from 'vue';
import { useLoadingView } from '@/modules/common/composables/useLoadingView';

const loadingView = useLoadingView()
import { useRegimenFiscalStore } from '@/modules/catalog/regimen-fiscal/stores/regimen-fiscal.store';
import { useMailServerStore } from '@/modules/catalog/mail-server/stores/mail-server.store';

const regimenFiscalStore = useRegimenFiscalStore();
const mailServerStore = useMailServerStore();

const sections = [
    {
      name: 'FiscalData',
      text: 'Datos Fiscales',
      isActive: true,
    },
    {
      name: 'FiscalAddress',
      text: 'Domicilio Fiscal',
      isActive: false,
    },
    {
      name: 'AccountInfo',
      text: 'Información de la cuenta',
      isActive: false,
    },
    {
      name: 'SendMails',
      text: 'Envió de correo',
      isActive: false,
    },
    {
      name: 'DigitalStamp',
      text: 'Sello Digital',
      isActive: false,
    },
  ];

onMounted(async()=> {
  loadingView.setIsLoading(true);
  await regimenFiscalStore.getAllFiscalRegimes();
  await mailServerStore.getMailServers();
  loadingView.setIsLoading(false);
})
</script>
