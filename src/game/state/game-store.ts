import { create } from "zustand";

export type AreaId = "about" | "projects" | "experience" | "skills" | "contact";

type GameState = {
  activeArea: AreaId | null;
  nearbyArea: AreaId | null;
  setActiveArea: (area: AreaId | null) => void;
  setNearbyArea: (area: AreaId | null) => void;
};

export const useGameStore = create<GameState>((set) => ({
  activeArea: null,
  nearbyArea: null,
  setActiveArea: (activeArea) => set({ activeArea }),
  setNearbyArea: (nearbyArea) =>
    set((state) => state.nearbyArea === nearbyArea ? state : { nearbyArea }),
}));
