"use client";

import { useEffect, useRef, useState } from "react";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScMO7KHh4TCNL1UvJXU2nqCg5ogJH4rFS0pf7h8R2uhCRC_nQ/viewform?embedded=true";

export function RecoveryPlusWaitlistForm() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const loadCountRef = useRef(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const onLoad = () => {
      loadCountRef.current += 1;
      // First load = initial render. Subsequent load = form was submitted
      // (Google navigates the iframe to the "response recorded" page).
      if (loadCountRef.current > 1) setSubmitted(true);
    };
    iframe.addEventListener("load", onLoad);
    return () => iframe.removeEventListener("load", onLoad);
  }, []);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black p-8 text-center">
        <p className="text-lg text-white">
          You&apos;re on the list. We&apos;ll email you when Recovery Plus launches.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black p-4 sm:p-6">
      <h3 className="text-xl font-semibold text-white">Join the Recovery Plus Waitlist</h3>
      <p className="mt-1 text-sm text-white/70">
        Enter your details below. We&apos;ll be in touch as soon as we launch.
      </p>

      <div className="relative mt-6 w-full overflow-hidden rounded-xl bg-black">
        <iframe
          ref={iframeRef}
          src={FORM_URL}
          title="Recovery Plus Waitlist"
          className="block w-full border-0 bg-black"
          style={{ height: 900, colorScheme: "light" }}
          loading="lazy"
        >
          Loading…
        </iframe>
      </div>

      <div className="mt-6 flex justify-center">
        <a
          href={FORM_URL.replace("?embedded=true", "")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          style={{ backgroundColor: "#3B82F6" }}
        >
          Join Waitlist
        </a>
      </div>
    </div>
  );
}
