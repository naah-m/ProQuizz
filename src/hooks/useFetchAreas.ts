import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AreaAtuacao } from '../types/index';
import { areaService } from '../services/areaService';

export function useFetchAreas(filterByUser = false) {

  const [areas, setAreas] = useState<AreaAtuacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAreas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const allAreas = await areaService.getAll();

      if (filterByUser) {
        const savedPreferences = await AsyncStorage.getItem('@App:affinityAreas');
        
        if (savedPreferences) {
          const selectedIds: string[] = JSON.parse(savedPreferences);
          const filtered = allAreas.filter(area => selectedIds.includes(area.id));
          setAreas(filtered);

        } else {
          setAreas(allAreas);
        }

      } else {
        setAreas(allAreas);
      }
      
    } catch (err) {
      console.error("Erro ao carregar áreas:", err);
      setError("Não foi possível carregar as áreas.");

    } finally {
      setLoading(false);
    }
    
  }, [filterByUser]);

  useEffect(() => {
    loadAreas();
  }, [loadAreas]);

  return { areas, loading, error, reload: loadAreas };
  }