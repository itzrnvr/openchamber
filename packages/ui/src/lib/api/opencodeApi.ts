/**
 * OpenCode Server API Client
 * 
 * Direct HTTP client for OpenCode server APIs that are not available in the SDK
 * Used for commands like edit, clear, and compact that require direct server interaction
 */

const API_BASE = '/api';

/**
 * Get authentication headers for API calls
 * Authentication is handled by server via cookies/session
 */
const getAuthHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'X-OpenChamber-Version': '1.0'
  };
};

/**
 * Handle API errors consistently
 * Extracts error messages from response or provides fallback
 */
const handleApiError = async (response: Response): Promise<never> => {
  try {
    const errorData = await response.json();
    const errorMessage = errorData.message || errorData.error || `HTTP ${response.status}`;
    throw new Error(errorMessage);
  } catch {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
};

/**
 * OpenCode Server API Client
 * Provides direct access to server endpoints for commands not in SDK
 */
export const opencodeApi = {
  /**
   * Edit a message in a session
   * Used by the /edit command
   * 
   * @param sessionId - The session ID
   * @param messageId - The message ID to edit
   * @param content - The new message content
   * @returns Promise with the updated message
   */
  async editMessage(sessionId: string, messageId: string, content: string) {
    const response = await fetch(
      `${API_BASE}/session/${sessionId}/message/${messageId}`,
      {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ content })
      }
    );
    
    if (!response.ok) {
      await handleApiError(response);
    }
    
    return response.json();
  },

  /**
   * Clear a session
   * Used by the /clear command
   * 
   * @param sessionId - The session ID to clear
   * @returns Promise with the cleared session
   */
  async clearSession(sessionId: string) {
    const response = await fetch(
      `${API_BASE}/session/${sessionId}/clear`,
      {
        method: 'POST',
        headers: getAuthHeaders()
      }
    );
    
    if (!response.ok) {
      await handleApiError(response);
    }
    
    return response.json();
  },

  /**
   * Compact a session history
   * Used by the /compact command
   * 
   * @param sessionId - The session ID to compact
   * @returns Promise with the compacted session
   */
  async compactSession(sessionId: string) {
    const response = await fetch(
      `${API_BASE}/session/${sessionId}/compact`,
      {
        method: 'POST',
        headers: getAuthHeaders()
      }
    );
    
    if (!response.ok) {
      await handleApiError(response);
    }
    
    return response.json();
  },

  /**
   * Get session state for command validation
   * Used to check if commands can be executed
   * 
   * @param sessionId - The session ID
   * @returns Promise with session state
   */
  async getSessionState(sessionId: string) {
    const response = await fetch(
      `${API_BASE}/session/${sessionId}/state`,
      {
        method: 'GET',
        headers: getAuthHeaders()
      }
    );
    
    if (!response.ok) {
      await handleApiError(response);
    }
    
    return response.json();
  }
};

// Export types for better TypeScript support
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export interface SessionState {
  canRevert: boolean;
  canUnrevert: boolean;
  canAbort: boolean;
  lastMessageId?: string;
  messageCount: number;
}

export interface MessageUpdate {
  id: string;
  content: string;
  updatedAt: string;
}

export interface SessionClearResult {
  sessionId: string;
  clearedAt: string;
  messageCount: number;
}

export interface SessionCompactResult {
  sessionId: string;
  compactedAt: string;
  originalSize: number;
  newSize: number;
}