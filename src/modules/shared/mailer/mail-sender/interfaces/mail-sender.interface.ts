import type { MailServer } from "@/modules/catalog/mail-server/interfaces/mail-server.interface";

export interface MailSender {
  mailServer: MailServer;
  user:       string;
  password: string;
}