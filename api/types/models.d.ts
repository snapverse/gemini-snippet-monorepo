declare namespace M {
  export interface CodeSnippet {
    id: ID;
    explanation: string;
    language: string;
    code: string;
    votes?: number;
    source?: Source;
    createdAt?: TimeStamp;
    updatedAt?: TimeStamp;
  }
}
