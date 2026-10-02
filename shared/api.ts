/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Auth types
export interface OTPSendRequest {
  channel: "email" | "phone";
  identifier: string;
}

export interface OTPSendResponse {
  ok: true;
  expiresIn: number;
  resendIn: number;
}

export interface OTPVerifyRequest {
  channel: "email" | "phone";
  identifier: string;
  otp: string;
}

export interface OTPVerifyResponse {
  token: string;
  user: {
    channel: "email" | "phone";
    identifier: string;
  };
}

export interface AuthUser {
  channel: "email" | "phone";
  identifier: string;
  name?: string;
}
