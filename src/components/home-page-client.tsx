//src/components/home-page-client.tsx
"use client";

import { sayHello } from "../server-actions/say-hello";
import { useState, useEffect } from "react";
import { EnhancedSuspense } from "react-enhanced-suspense";

export default function HomePageClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <EnhancedSuspense>{sayHello()}</EnhancedSuspense> : null;
}
