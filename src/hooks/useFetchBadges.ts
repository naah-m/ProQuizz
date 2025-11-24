import { useState, useEffect } from 'react';
import { Badge } from '../types';

import { badgeService } from '../services/badgeService';

interface BadgeStatus extends Badge {
    unlocked: boolean;
}

export function useFetchBadges() {
  const [badges, setBadges] = useState<BadgeStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBadges() {
      try {
        setLoading(true);
        const { all, userIds } = await badgeService.getBadges();
        
        const categorizedBadges: BadgeStatus[] = all.map(badge => ({
          ...badge,
          unlocked: userIds.includes(badge.id),
        }));
        
        setBadges(categorizedBadges);
      } catch (err) {
        setError("Não foi possível carregar as recompensas.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadBadges();
  }, []);

  return { badges, loading, error };
}