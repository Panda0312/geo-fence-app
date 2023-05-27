import { atom } from "jotai";

import type { TFences, TLatlng, TPaths } from "./types";

export const showFenceConfig = atom(false);

export const currentLineColor = atom<string>("red");

export const currentFillColor = atom<string>("#0000FF66");

export const pendingFencePaths = atom<TPaths>([]);

export const pendingPoint = atom<TLatlng | null>(null);

export const savedFences = atom<TFences>(new Map());
