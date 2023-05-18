"use client";

import React from "react";
import { BrowserView } from "react-device-detect";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return <BrowserView></BrowserView>;
}
