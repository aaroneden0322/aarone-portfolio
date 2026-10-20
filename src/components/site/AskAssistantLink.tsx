"use client";

/**
 * Opens the chat assistant from a link. If the assistant is not on the page
 * (nothing handles the event) the link behaves as a normal link to the
 * contact form, so it never dead-ends.
 */
export default function AskAssistantLink({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href="#contact"
      className={className}
      onClick={(e) => {
        const detail = { handled: false };
        window.dispatchEvent(new CustomEvent("open-assistant", { detail }));
        if (detail.handled) e.preventDefault();
      }}
    >
      {children}
    </a>
  );
}
