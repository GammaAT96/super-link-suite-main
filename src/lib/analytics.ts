import { supabase } from "./supabaseClient";

export type AnalyticsEventPayload = Record<string, unknown>;

export async function recordAnalyticsEvent(params: {
  userId?: string | null;
  linkId?: string | null;
  eventType: string;
  payload: AnalyticsEventPayload;
}) {
  const { userId = null, linkId = null, eventType, payload } = params;

  const { error } = await supabase.from("events").insert({
    user_id: userId,
    link_id: linkId,
    event_type: eventType,
    occurred_at: new Date().toISOString(),
    payload,
  });

  if (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to record analytics event", error);
    throw error;
  }
}


