import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { recordAnalyticsEvent } from "@/lib/analytics";

const Redirect = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const go = async () => {
      if (!code) {
        navigate("/", { replace: true });
        return;
      }
      const { data, error } = await supabase
        .from("links")
        .select("destination, id")
        .eq("code", code)
        .maybeSingle();

      if (error || !data?.destination) {
        navigate("/not-found", { replace: true });
        return;
      }

      // Record click event
      try {
        await recordAnalyticsEvent({
          linkId: data.id.toString(),
          eventType: "link_clicked",
          payload: {
            code,
            destination: data.destination,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
          },
        });
      } catch (e) {
        // Don't block redirect if analytics fails
        console.warn("Failed to record click event:", e);
      }

      window.location.replace(data.destination as string);
    };
    void go();
  }, [code, navigate]);

  return null;
};

export default Redirect;


