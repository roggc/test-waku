//src/components/home-page-client.tsx
"use client";

import { sayHello } from "../server-actions/say-hello";
import { Suspense, useState, useEffect } from "react";

export default function HomePageClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <Suspense fallback="loading...">{sayHello()}</Suspense>
  ) : null;
}
