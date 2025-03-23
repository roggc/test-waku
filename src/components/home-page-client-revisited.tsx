//src/components/home-page-client-revisited.tsx
"use client";

import { sayHelloRevisited } from "../server-actions/say-hello-revisited";
import { useState, useEffect } from "react";
import SayHello from "./say-hello";

export default function HomePageClientRevisited() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <SayHello promise={sayHelloRevisited()} /> : null;
}
