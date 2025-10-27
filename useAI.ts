/**
 * Custom hooks for AI feature state management
 * Provides loading states, error handling, and data management
 */

import { useState, useCallback } from 'react';
import { apiService } from '../services/apiService';
import type { 
  LeadEnrichmentRequest, 
  EmailGenerationRequest, 
  LeadScoringRequest, 
  SequenceGenerationRequest 
} from '../services/apiService';

// Generic AI hook state
interface AIHookState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  usage?: {
    tokens: number;
    cost: number;
  };
}

// Generic AI hook return type
interface AIHookReturn<T> extends AIHookState<T> {
  execute: (request: any) => Promise<void>;
  reset: () => void;
}

/**
 * Generic AI hook factory
 */
function createAIHook<T>(serviceMethod: (request: any) => Promise<any>) {
  return (): AIHookReturn<T> => {
    const [state, setState] = useState<AIHookState<T>>({
      data: null,
      loading: false,
      error: null
    });

    const execute = useCallback(async (request: any) => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const response = await serviceMethod(request);
        
        if (response.success) {
          setState({
            data: response.data,
            loading: false,
            error: null,
            usage: response.usage
          });
        } else {
          setState(prev => ({
            ...prev,
            loading: false,
            error: response.error || 'Unknown error occurred'
          }));
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Network error occurred'
        }));
      }
    }, []);

    const reset = useCallback(() => {
      setState({
        data: null,
        loading: false,
        error: null
      });
    }, []);

    return {
      ...state,
      execute,
      reset
    };
  };
}

/**
 * Hook for lead enrichment
 */
export const useLeadEnrichment = createAIHook<any>(apiService.enrichLeads.bind(apiService));

/**
 * Hook for email generation
 */
export const useEmailGeneration = createAIHook<any>(apiService.generateEmails.bind(apiService));

/**
 * Hook for lead scoring
 */
export const useLeadScoring = createAIHook<any>(apiService.scoreLeads.bind(apiService));

/**
 * Hook for sequence generation
 */
export const useSequenceGeneration = createAIHook<any>(apiService.generateSequence.bind(apiService));

/**
 * Hook for managing multiple AI operations
 */
export const useAIOperations = () => {
  const [operations, setOperations] = useState<Record<string, AIHookState<any>>>({});
  const [totalTokens, setTotalTokens] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const startOperation = useCallback((operationId: string) => {
    setOperations(prev => ({
      ...prev,
      [operationId]: { data: null, loading: true, error: null }
    }));
  }, []);

  const completeOperation = useCallback((operationId: string, data: any, usage?: { tokens: number; cost: number }) => {
    setOperations(prev => ({
      ...prev,
      [operationId]: { data, loading: false, error: null, usage }
    }));

    if (usage) {
      setTotalTokens(prev => prev + usage.tokens);
      setTotalCost(prev => prev + usage.cost);
    }
  }, []);

  const failOperation = useCallback((operationId: string, error: string) => {
    setOperations(prev => ({
      ...prev,
      [operationId]: { data: null, loading: false, error }
    }));
  }, []);

  const resetOperation = useCallback((operationId: string) => {
    setOperations(prev => {
      const newOps = { ...prev };
      delete newOps[operationId];
      return newOps;
    });
  }, []);

  const resetAll = useCallback(() => {
    setOperations({});
    setTotalTokens(0);
    setTotalCost(0);
  }, []);

  const getOperation = useCallback((operationId: string) => {
    return operations[operationId] || { data: null, loading: false, error: null };
  }, [operations]);

  return {
    operations,
    totalTokens,
    totalCost,
    startOperation,
    completeOperation,
    failOperation,
    resetOperation,
    resetAll,
    getOperation
  };
};

/**
 * Hook for AI feature analytics
 */
export const useAIAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    averageResponseTime: 0,
    featureUsage: {} as Record<string, number>
  });

  const trackRequest = useCallback((feature: string, success: boolean, responseTime: number) => {
    setAnalytics(prev => ({
      totalRequests: prev.totalRequests + 1,
      successfulRequests: prev.successfulRequests + (success ? 1 : 0),
      failedRequests: prev.failedRequests + (success ? 0 : 1),
      averageResponseTime: (prev.averageResponseTime * prev.totalRequests + responseTime) / (prev.totalRequests + 1),
      featureUsage: {
        ...prev.featureUsage,
        [feature]: (prev.featureUsage[feature] || 0) + 1
      }
    }));
  }, []);

  const resetAnalytics = useCallback(() => {
    setAnalytics({
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      featureUsage: {}
    });
  }, []);

  return {
    analytics,
    trackRequest,
    resetAnalytics
  };
};