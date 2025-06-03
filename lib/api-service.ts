import { getSocket } from "@/utils/socket";
import type { ChatMode } from "./types";

// API endpoint configurations for each mode
// export const ENDPOINT_CONFIG: Record<ChatMode, string> = {
//   Chat: "qa",
//   Summarize: "summarize",
//   Arguments: "argument",
//   Draft: "draft",
//   "Contract Review": "contract_review",
// };
export const ENDPOINT_CONFIG: Record<
  ChatMode,
  {
    endpoint: string;
    socketEmit: string;
    socketResponse: string;
  }
> = {
  Chat: {
    endpoint: "qa",
    socketEmit: "qa:ask", // was 'qa_request'
    socketResponse: "qa:response", // was 'qa_response'
  },
  Summarize: {
    endpoint: "summarize",
    socketEmit: "doc:summarize", // was 'summarize_request'
    socketResponse: "doc:summary", // was 'summarize_response'
  },
  Arguments: {
    endpoint: "argument",
    socketEmit: "argument:ask", // was 'argument_request'
    socketResponse: "argument:response", // same as before, just confirming
  },
  Draft: {
    endpoint: "draft",
    socketEmit: "draft_request", // no backend shown, keep if you have it
    socketResponse: "draft_response",
  },
  "Contract Review": {
    endpoint: "contract_review",
    socketEmit: "contract_review_request",
    socketResponse: "contract_review_response",
  },
};

// Get the backend URL from environment variables with fallback
export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://flask-app-production-077c.up.railway.app";

// Create a new conversation
export async function createConversation(token: string): Promise<string> {
  const response = await fetch(`${BACKEND_URL}/conversations/new`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create conversation");
  }

  const data = await response.json();
  return data.conversation_id;
}

// Get conversation history
export async function getConversationHistory(
  conversationId: string,
  token: string
): Promise<any[]> {
  const response = await fetch(
    `${BACKEND_URL}/conversations/${conversationId}/history`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch conversation history");
  }

  const data = await response.json();
  return data.history || [];
}

// Send a message to the appropriate endpoint based on mode
// export async function sendMessage(
//     mode: ChatMode,
//     conversationId: string,
//     question: string,
//     token: string,
//     argumentType: "for" | "against" | "both" = "both",
//     lastDocId?: string, // Added parameter for document ID
// ): Promise<any> {
//     const endpoint = ENDPOINT_CONFIG[mode]

//     // Different payload structure based on endpoint
//     const payload: any = {
//         conversation_id: conversationId,
//     }

//     // Add the appropriate field name based on the endpoint
//     if (endpoint === "qa") {
//         payload.question = question
//     } else if (endpoint === "argument") {
//         payload.query = question
//         payload.type = argumentType // Use the argument type
//     } else if (endpoint === "draft") {
//         payload.prompt = question
//         // Include document ID for draft if available
//         if (lastDocId) {
//             payload.last_doc_id = lastDocId
//         }
//     } else {
//         // For summarize and contract_review, include the document ID if available
//         payload.question = question // Include it anyway for consistency
//         if (lastDocId) {
//             payload.last_doc_id = lastDocId
//         }
//     }

//     try {
//         const response = await fetch(`${BACKEND_URL}/${endpoint}`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(payload),
//         })

//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}))
//             const errorMessage = errorData.error || `Error during ${mode} request (Status: ${response.status})`
//             throw new Error(errorMessage)
//         }

//         return await response.json()
//     } catch (error: any) {
//         console.error(`API Error (${endpoint}):`, error)
//         throw new Error(error.message || `Failed to communicate with the ${mode} service`)
//     }
// }

export async function sendMessage(
  mode: ChatMode,
  conversationId: string,
  question: string,
  token: string,
  argumentType: "for" | "against" | "both" = "both",
  lastDocId?: string
): Promise<any> {
  const socket = getSocket();
  const config = ENDPOINT_CONFIG[mode];
  const endpoint = config.endpoint;
  const emitEvent = config.socketEmit;
  const responseEvent = config.socketResponse;

  // Build the payload
  const payload: any = {
    conversation_id: conversationId,
  };

  if (endpoint === "qa") {
    payload.question = question;
  } else if (endpoint === "argument") {
    payload.query = question;
    payload.type = argumentType;
  } else if (endpoint === "draft") {
    payload.prompt = question;
    if (lastDocId) {
      payload.last_doc_id = lastDocId;
    }
  } else {
    payload.question = question;
    if (lastDocId) {
      payload.last_doc_id = lastDocId;
    }
  }

  // Map request and response events

  return new Promise((resolve, reject) => {
    const errorEvent = emitEvent
      .replace(/:ask$/, ":error")
      .replace(/_request$/, "_error");

    // Response handler
    const responseHandler = (data: any) => {
      socket.off(responseEvent, responseHandler);
      socket.off(errorEvent, errorHandler);
      if (data?.error) {
        reject(new Error(data.error));
      } else {
        resolve(data);
      }
    };

    // Error handler (e.g. "qa:error")
    const errorHandler = (err: any) => {
      socket.off(responseEvent, responseHandler);
      socket.off(errorEvent, errorHandler);
      reject(new Error(err?.message || "Unknown socket error"));
    };

    // Set up listeners
    socket.on(responseEvent, responseHandler);
    socket.on(errorEvent, errorHandler);

    // Emit event to backend
    socket.emit(emitEvent, {
      token,
      ...payload,
    });

    // Optional: Timeout safety
    setTimeout(() => {
      socket.off(responseEvent, responseHandler);
      socket.off(errorEvent, errorHandler);
      reject(new Error("Response timed out"));
    }, 30000);
  });
}
// Upload a file
export async function uploadFile(
  file: File,
  conversationId: string,
  token: string
): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("conversation_id", conversationId);

  try {
    const response = await fetch(`${BACKEND_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error || `Error uploading file (Status: ${response.status})`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error: any) {
    console.error("File Upload Error:", error);
    throw new Error(
      error.message || "Failed to upload file. Please try again."
    );
  }
}

// Query documents
export async function queryDocuments(
  query: string,
  conversationId: string,
  token: string,
  topK = 5
): Promise<any> {
  const response = await fetch(`${BACKEND_URL}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      conversation_id: conversationId,
      query,
      top_k: topK,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error querying documents");
  }

  return await response.json();
}

// Submit feedback for a message
export async function submitFeedback(
  messageId: string,
  feedback: "positive" | "negative",
  token: string
): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message_id: messageId,
      feedback,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to submit feedback");
  }
}

// Export conversation to PDF or Word
export async function exportConversation(
  conversationId: string,
  format: "pdf" | "docx",
  token: string
): Promise<Blob> {
  const response = await fetch(
    `${BACKEND_URL}/export/${conversationId}?format=${format}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `Failed to export as ${format}`);
  }

  return await response.blob();
}

// Logout the user (blacklist token)
export async function logoutUser(token: string): Promise<any> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error || `Error logging out (Status: ${response.status})`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Logout Error:", error);
    throw new Error(error.message || "Failed to logout. Please try again.");
  }
}

// Get user profile
export async function getUserProfile(token: string): Promise<any> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error ||
        `Error fetching profile (Status: ${response.status})`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error: any) {
    if (error.message === "Token has expired") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else {
      console.error("Profile Fetch Error:", error);
      throw new Error(error || "Failed to fetch profile. Please try again.");
    }
  }
}

// Update user profile
export async function updateUserProfile(
  profileData: any,
  token: string
): Promise<any> {
  try {
    // Check if profileData contains a File object for profile_image
    if (profileData.profile_image instanceof File) {
      const formData = new FormData();

      // Add all other fields to formData
      Object.keys(profileData).forEach((key) => {
        if (key !== "profile_image") {
          formData.append(key, profileData[key]);
        }
      });

      // Add the file last
      formData.append("profile_image", profileData.profile_image);

      const response = await fetch(`${BACKEND_URL}/api/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.error ||
          `Error updating profile (Status: ${response.status})`;
        throw new Error(errorMessage);
      }

      return await response.json();
    } else {
      // Handle base64 image or no image case
      const response = await fetch(`${BACKEND_URL}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.error ||
          `Error updating profile (Status: ${response.status})`;
        throw new Error(errorMessage);
      }

      return await response.json();
    }
  } catch (error: any) {
    console.error("Profile Update Error:", error);
    throw new Error(
      error.message || "Failed to update profile. Please try again."
    );
  }
}

// Change user password
export async function changePassword(
  currentPassword: string,
  newPassword: string,
  token: string
): Promise<any> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error ||
        `Error changing password (Status: ${response.status})`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Password Change Error:", error);
    throw new Error(
      error.message || "Failed to change password. Please try again."
    );
  }
}

// Folder APIs
export const createFolder = async (folderName: string, token: string) => {
  const response = await fetch(BACKEND_URL + "/api/folders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ folder_name: folderName }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create folder");
  }

  return response.json();
};

export const getFolders = async (token: string) => {
  const response = await fetch(BACKEND_URL + "/api/folders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch folders");
  }

  return response.json();
};

export const updateFolder = async (
  folderId: number,
  folderName: string,
  token: string
) => {
  const response = await fetch(BACKEND_URL + `/api/folders/${folderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ folder_name: folderName }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update folder");
  }

  return response.json();
};

export const deleteFolder = async (folderId: number, token: string) => {
  const response = await fetch(BACKEND_URL + `/api/folders/${folderId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete folder");
  }

  return response.json();
};

// Case APIs
export const createCase = async (
  caseName: string,
  clientName: string,
  token: string
) => {
  const response = await fetch(BACKEND_URL + "/api/cases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ case_name: caseName, client_name: clientName }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create case");
  }

  return response.json();
};

export const getCases = async (token: string) => {
  const response = await fetch(BACKEND_URL + "/api/cases", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch cases");
  }

  return response.json();
};

export const getCase = async (caseId: number, token: string) => {
  const response = await fetch(BACKEND_URL + `/api/cases/${caseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch case");
  }

  return response.json();
};

export const updateCase = async (
  caseId: number,
  data: { case_name?: string; client_name?: string },
  token: string
) => {
  const response = await fetch(BACKEND_URL + `/api/cases/${caseId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update case");
  }

  return response.json();
};

export const deleteCase = async (caseId: number, token: string) => {
  const response = await fetch(BACKEND_URL + `/api/cases/${caseId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete case");
  }

  return response.json();
};

// Document APIs
export const uploadDocument = async (
  file: File,
  parentType: "case" | "folder",
  parentId: number,
  token: string
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("parent_type", parentType);
  formData.append("parent_id", parentId.toString());

  const response = await fetch(BACKEND_URL + "/api/documents/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to upload document");
  }

  return response.json();
};

export const getDocuments = async (
  parentType: "case" | "folder",
  parentId: number,
  token: string
) => {
  const response = await fetch(
    BACKEND_URL +
      `/api/documents?parent_type=${parentType}&parent_id=${parentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch documents");
  }

  return response.json();
};

export const getArticles = async (token: string) => {
  try {
    const response = await fetch(BACKEND_URL + "/api/columns", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch articles");
    }

    return response.json();
  } catch (error: any) {
    console.error("Articles Fetch Error:", error);
    throw new Error(
      error.message || "Failed to fetch articles. Please try again."
    );
  }
};
export const getArticleById = async (columnId: string, token: string) => {
  try {
    const response = await fetch(BACKEND_URL + `/api/columns/${columnId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch article by id");
    }

    return response.json();
  } catch (error: any) {
    console.error("Article Fetch Error:", error);
    throw new Error(
      error.message || "Failed to fetch article. Please try again."
    );
  }
};

export const createArticle = async (
  title: string,
  content: string,
  token: string
) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    const response = await fetch(BACKEND_URL + "/api/columns", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create article");
    }

    return response.json();
  } catch (error: any) {
    console.error("Article Create Error:", error);
    throw new Error(
      error.message || "Failed to create article. Please try again."
    );
  }
};

export const getCasesList = async (courtType: string, token: string) => {
  try {
    const response = await fetch(BACKEND_URL + `/api/${courtType}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch cases list");
    }

    return response.json();
  } catch (error: any) {
    console.error("Cases List Fetch Error:", error);
    throw new Error(
      error.message || "Failed to fetch cases list. Please try again."
    );
  }
};

export const loadAmicusRecentConversations = async (token: string) => {
  try {
    const response = await fetch(BACKEND_URL + "/api/conversations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch recent conversations");
    }

    return response.json();
  } catch (error: any) {
    console.error("Recent Conversations Fetch Error:", error);
    throw new Error(
      error.message || "Failed to fetch recent conversations. Please try again."
    );
  }
};

export async function searchArticles(search_text: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/search-articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search_text }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error searching articles:", error);
    throw error;
  }
}
