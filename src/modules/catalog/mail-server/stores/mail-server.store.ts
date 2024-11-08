import { lackConnectionErrorResponse } from "@/modules/common/error/general.exception";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { MailServer } from "../interfaces/mail-server.interface";
import GetMailServersAction from "../actions/get-mail-servers.action";
import type { ResponseDto } from "@/modules/common/interfaces/api-schema-response";


export const useMailServerStore = defineStore('useMailServerStore', ()=>{
  const mailServers = ref<MailServer[]>([]);
  const getMailServers = async (): Promise<ResponseDto> => {
    try {
      const response = await GetMailServersAction();
      if(!response.success) {
        return {
          success: false,
          message: response.message
        }
      }
      const {data, ...rest } = response;
      mailServers.value = data;
      return rest;
    } catch (error) {
      return lackConnectionErrorResponse;
    }
  }

  return {
    mailServers,

    getMailServers,
  }
});