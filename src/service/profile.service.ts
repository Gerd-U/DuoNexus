import type { UserProfile } from '../models/profile.models';

const BASE = "/profile.json";

export async function getAllProfiles(): Promise<UserProfile[]> {
  const res = await fetch(BASE);
  return res.json();
}

export async function getProfileBySummonerName(name: string): Promise<UserProfile | null> {
  const profiles = await getAllProfiles();
  return profiles.find(p => p.summonerName.toLowerCase() === name.toLowerCase()) ?? null;
}

export async function getProfileById(id: string): Promise<UserProfile | null> {
  const profiles = await getAllProfiles();
  return profiles.find(p => p.id === id) ?? null;
}