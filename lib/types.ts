// Define types for different response formats
export type BaseResponse = {
    error?: string
  }

  export type ChatResponse = BaseResponse & {
    question: string
    answer: string
  }

  export type SummarizeResponse = BaseResponse & {
    summary: string
  }

  export type ArgumentResponse = BaseResponse & {
    arguments: string
  }

  export type ContractReviewResponse = BaseResponse & {
    review: string
  }

  export type DraftResponse = BaseResponse & {
    draft: string
  }

  export type UploadResponse = BaseResponse & {
    doc_id: string
  }

  export type Message = {
    id: string
    role: "user" | "assistant"
    content: string
    reasoning?: string
    answer?: string
    avatar?: string
    timestamp: Date
    feedback?: "positive" | "negative" | null
  }

  export type ChatMode = "Chat" | "Summarize" | "Arguments" | "Draft" | "Contract Review"

  export type ArgumentType = "for" | "against" | "both"
