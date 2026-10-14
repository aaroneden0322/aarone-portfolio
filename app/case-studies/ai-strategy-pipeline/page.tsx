import type { Metadata } from "next";
import StrategyPipelinePage from "@/components/site/StrategyPipelinePage";

export const metadata: Metadata = {
  title: "AI-written marketing automation plans | Aarone Den Patayan",
  description:
    "How a chain of prompts turns a discovery call into a complete GoHighLevel strategy document, and what has and has not been tested.",
};

export default function Page() {
  return <StrategyPipelinePage />;
}
