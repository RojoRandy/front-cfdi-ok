import type { ResponseDto } from "@/modules/common/interfaces/api-schema-response";
import { defineStore } from "pinia";
import GetMailSenderAction from "../actions/get-mail-sender.action";
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import { lackConnectionErrorResponse } from "@/modules/common/error/general.exception";
import SaveMailSenderAction from "../actions/save-mail-sender.action";
import type { SaveMailSenderRequest } from "../interfaces/save-mail-sender.interface";
import { ref } from "vue";
import type { MailSender } from "../interfaces/mail-sender.interface";


export const useMailSenderStore = defineStore('useMailSenderStore', ()=> {
  const authStore = useAuthStore();
  const mailSender = ref<MailSender>()

  const getMailSender = async(): Promise<ResponseDto> => {
    try {
      const response = await GetMailSenderAction(authStore.user?.id!);

      if(response?.data) {
        mailSender.value = response.data
      } 

      return response;
    } catch (error) {
      return lackConnectionErrorResponse;
    }
  }

  const saveMailSender = async(request: SaveMailSenderRequest): Promise<ResponseDto> => {
    try {
      const response = await SaveMailSenderAction(authStore.user?.id!, request);
      return response;
    } catch (error) {
      return lackConnectionErrorResponse;
    }
  }

  return {
    mailSender,
    //Actions
    getMailSender,
    saveMailSender,
  }
})