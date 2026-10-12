import ChatAssistant from "./ChatAssistant";
import FloatingCta from "./FloatingCta";

// One switch for the floating button. With the assistant off (default) the
// site keeps the original "Fix My Bottleneck" pill. Setting
// NEXT_PUBLIC_ASSISTANT_ENABLED=true in Vercel and redeploying swaps in the
// chat widget; setting it back and redeploying reverses it. The n8n kill
// switch is the faster off button, so use that first in an emergency.
export default function FloatingAction() {
  return process.env.NEXT_PUBLIC_ASSISTANT_ENABLED === "true" ? (
    <ChatAssistant />
  ) : (
    <FloatingCta />
  );
}
