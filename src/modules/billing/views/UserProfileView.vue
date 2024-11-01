<template>
  <ProfileHeader />

  <div class="mb-20">
    <TabSections 
      :sections="sections"
    >
    <template #body="bodyProps">
      <FiscalData 
        v-if="bodyProps.activeSection!.name === 'FiscalData'" 
        />
      <FiscalAddress v-if="bodyProps.activeSection!.name === 'FiscalAddress'"/>
      <AccountInfo v-if="bodyProps.activeSection!.name === 'AccountInfo'"/>
      <SendMails v-if="bodyProps.activeSection!.name === 'SendMails'"/>
      <DigitalStamp v-if="bodyProps.activeSection!.name === 'DigitalStamp'"/>

    </template>
    </TabSections>
  </div>
</template>

<script setup lang="ts">
import TabSections from '@/modules/common/components/TabSections.vue';
import ProfileHeader from '../components/user-profile/ProfileHeader.vue';
import FiscalData from '../components/user-profile/FiscalData.vue';
import FiscalAddress from '../components/user-profile/FiscalAddress.vue';
import AccountInfo from '../components/user-profile/AccountInfo.vue';
import SendMails from '../components/user-profile/SendMails.vue';
import DigitalStamp from '../components/user-profile/DigitalStamp.vue';

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
</script>
