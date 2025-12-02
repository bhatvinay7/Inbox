// src/types/imapflow.d.ts
declare module "imapflow" {
  export interface FetchMessageObject {
    uid: number;
    envelope: {
      subject: string | null;
      from: any;
      to: any;
      date: Date | null;
    };
    gmailLabels?: string[];
    source?: Buffer;
  }

  export class ImapFlow {
    constructor(options: any);
    connect(): Promise<void>;
    fetch(query: string, options: any): AsyncGenerator<FetchMessageObject>;
    logout(): Promise<void>;
  }
}
