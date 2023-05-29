import { atom } from "jotai";

import { FENCE_STORAGE_KEY } from "./constant";

import type { TFence, TFences, TLatlng, TPaths } from "./types";

export const showFenceConfig = atom(false);

export const currentLineColor = atom<string>("red");

export const currentFillColor = atom<string>("#0000FF66");

export const pendingFencePaths = atom<TPaths>([]);

export const pendingPoint = atom<TLatlng | null>(null);

export const savedFences = atom<TFences>(new Map());

// Edit Fence
export const showFenceEdit = atom(false);

export const fenceOnEdit = atom(false);

export const fenceIdSelected = atom("");

export const selectedFenceInfo = atom(getter => {
  const fencesMap = getter(savedFences);
  const key = getter(fenceIdSelected);
  return fencesMap.get(key);
});

export const updateSelectedFence = atom(
  null,
  (getter, setter, payload: Partial<TFence>) => {
    const newMap = new Map(getter(savedFences));
    const key = getter(fenceIdSelected);
    const fence = newMap.get(key);
    if (fence) {
      newMap.set(key, { ...fence, ...payload });
      setter(savedFences, newMap);
      localStorage.setItem(
        FENCE_STORAGE_KEY,
        JSON.stringify(Array.from(newMap))
      );
    }
  }
);

export const deleteFence = atom(null, (getter, setter) => {
  const newMap = new Map(getter(savedFences));
  newMap.delete(getter(fenceIdSelected));
  setter(savedFences, newMap);
  setter(fenceIdSelected, "");
  localStorage.setItem(FENCE_STORAGE_KEY, JSON.stringify(Array.from(newMap)));
});
