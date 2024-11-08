export interface MailServer {
  id:        number;
  isActive:  boolean;
  createdAt: Date;
  updatedAt: Date;
  name:      string;
  server:    string;
  port:      number;
  secure:    boolean;
}
