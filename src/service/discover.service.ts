import type { DiscoverProfile } from "../models/discover.models";


const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getDiscoverProfiles(): Promise<DiscoverProfile[]> {
  const res = await fetch('/discover.data.json');
  if (!res.ok) throw new Error('Failed to fetch discover profiles');
  return res.json();
}

export async function getDiscoverProfileById(id: string): Promise<DiscoverProfile | null> {
  await delay(200);
  const profiles = await getDiscoverProfiles();
  return profiles.find(p => p.id === id) ?? null;
}

export async function getDiscoverProfilesByRole(role: string): Promise<DiscoverProfile[]> {
  const profiles = await getDiscoverProfiles();
  return profiles.filter(p => p.mainRole === role);
}

export async function getDiscoverProfilesByRank(tier: string): Promise<DiscoverProfile[]> {
  const profiles = await getDiscoverProfiles();
  return profiles.filter(p => p.rank.tier === tier);
}