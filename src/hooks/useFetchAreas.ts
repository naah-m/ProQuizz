import { useState, useEffect } from 'react';
import { AreaAtuacao } from '../types/index';
import { areaService } from '../services/areaService';

export function useFetchAreas() {
  const [areas, setAreas] = useState<AreaAtuacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAreas();
  }, []);

  async function loadAreas() {
    try {
      setLoading(true);
      setError(null);
      
      const data = await areaService.getAll();
      setAreas(data);
      
    } catch (err) {
      console.error("Erro ao carregar áreas:", err);
      setError("Não foi possível carregar as áreas. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  }

  return { areas, loading, error, reload: loadAreas };
}