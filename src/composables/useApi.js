import { ref, computed, watch } from 'vue';
import axios from 'axios';
import apiClient from '../services/api';
import { useAlertStore } from '../stores/alert';
import {
    setCache,
    getCache,
    clearCacheForUrl,
    clearAllCache,
    listCacheKeys,
    clearCacheMatching,
    useNetworkStatus,
    handleRetry,
} from '../utils/useApiUtils';

/**
 * Helper to serialize query params into URL string
 */
function buildQueryString(params = {}) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, value);
        }
    });
    const str = searchParams.toString();
    return str ? `?${str}` : '';
}

/**
 * Advanced API composable for Vue 3 with comprehensive features
 * 
 * @param {string} baseUrl - API endpoint base URL
 * @param {Object} options - Configuration options
 * @returns {Object} - API state and methods
 */
export function useApi(baseUrl, {
    method = 'GET',
    options = {},
    autoFetch = true,
    enableCache = false,
    useAuth = true,
    manualToken = null,
    transform = null,
    onError = null,
    onSuccess = null,
    onLoading = null,
    onComplete = null,
    onAbort = null,
    retry = 0,
    retryDelay = 1000,
    loadingDelay = 0,
    timeout = 15000,
    mock = null,
    pagination = false,
    transformPagination = null,
} = {}) {

    // Reactive state
    const data = ref(null);
    const error = ref(null);
    const status = ref('idle'); // idle | loading | success | error | refreshed | aborted
    const lastFetched = ref(null);
    let controller = null;
    const progress = ref(0);

    // Pagination state
    const currentPage = ref(1);
    const perPage = ref(options.perPage || 10);
    const totalItems = ref(null);

    // Network status
    const { isOnline } = useNetworkStatus();

    let hasRunOnce = false;

    /**
     * Mock API handler
     */
    const mockApi = async (payload, queryParams) => {
        if (typeof mock === 'object' && mock?.once && hasRunOnce) {
            return await request(payload, queryParams);
        }

        status.value = 'loading';
        error.value = null;

        const delay = typeof mock === 'object' && mock?.delay !== undefined ? mock.delay : 300;
        const simulateError = typeof mock === 'object' && mock?.simulateError;

        await new Promise(resolve => setTimeout(resolve, delay));

        if (simulateError) {
            status.value = 'error';
            error.value = mock?.error ?? ['Simulated API error'];
            data.value = null;
            return;
        }

        data.value = typeof mock === 'function' ? mock(payload, queryParams, method) : mock;
        status.value = 'success';
        lastFetched.value = new Date().toISOString();

        if (mock?.once) {
            hasRunOnce = true;
        }
    };

    /**
     * Main request execution
     */
    const request = async (payload = null, queryParams = {}, overridePage = null, attempt = 1) => {

        if (mock) {
            return await mockApi(payload, queryParams);
        }

        // Abort previous pending request
        if (controller) {
            await new Promise(resolve => setTimeout(resolve, 50));
            controller.abort();
        }
        controller = new AbortController();

        if (loadingDelay > 0) {
            await new Promise(resolve => setTimeout(resolve, loadingDelay));
        }

        status.value = 'loading';
        error.value = null;

        if (typeof onLoading === 'function') {
            onLoading();
        }

        try {
            const queryObj = {
                ...queryParams,
                ...(pagination ? {
                    page: overridePage ?? currentPage.value,
                    per_page: perPage.value
                } : {})
            };
            const queryString = buildQueryString(queryObj);
            const url = `${baseUrl}${queryString}`;

            // Invalidate cache for mutations
            if (enableCache && method.toUpperCase() !== 'GET') {
                clearCacheForUrl(baseUrl);
            }

            // Offline handling with cache
            if (!isOnline.value && enableCache && method.toUpperCase() === 'GET') {
                const cachedData = getCache(url);
                if (cachedData) {
                    const transformedData = transform ? transform(cachedData) : cachedData;
                    data.value = transformedData;

                    if (pagination && cachedData?.meta) {
                        totalItems.value = cachedData.meta.total || null;
                        currentPage.value = cachedData.meta.current_page || currentPage.value;
                        perPage.value = cachedData.meta.per_page || perPage.value;
                    }

                    status.value = 'success';
                    if (onSuccess) onSuccess(transformedData);
                    return;
                } else {
                    error.value = ['Offline: No cached data available'];
                    status.value = 'error';
                    return;
                }
            }

            // Build request headers
            const headers = {
                ...(options.headers || {})
            };
            if (manualToken) {
                headers['Authorization'] = `Bearer ${manualToken}`;
            }

            const reqConfig = {
                method,
                url,
                signal: controller.signal,
                headers,
                ...options,
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        progress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    }
                },
                onDownloadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        progress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    }
                },
                timeout
            };

            if (payload) reqConfig.data = payload;

            const clientToUse = useAuth ? apiClient : axios;
            const response = await clientToUse(reqConfig);

            // Handle pagination metadata
            if (pagination) {
                const dp = response.data?.dataPayload;
                if (typeof transformPagination === 'function') {
                    const meta = transformPagination(response.data);
                    totalItems.value = meta.totalItems ?? totalItems.value;
                    currentPage.value = meta.currentPage ?? currentPage.value;
                    perPage.value = meta.perPage ?? perPage.value;
                } else if (dp) {
                    totalItems.value = dp.totalCount ?? totalItems.value;
                    currentPage.value = dp.currentPage ?? currentPage.value;
                    perPage.value = dp.perPage ?? perPage.value;
                } else if (response.data?.meta) {
                    totalItems.value = response.data.meta.total || null;
                    currentPage.value = response.data.meta.current_page || currentPage.value;
                    perPage.value = response.data.meta.per_page || perPage.value;
                }
            }

            // Auto-alert feature from backend response
            const alertPayload = response.data?.alertifyPayload || response.data?.dataPayload?.alertify;
            if (alertPayload) {
                const alertStore = useAlertStore();
                alertStore.show(alertPayload);
            }

            data.value = transform ? transform(response.data) : response.data;

            if (typeof onSuccess === 'function') {
                onSuccess(data.value);
            }

            if (enableCache && method.toUpperCase() === 'GET') {
                setCache(url, response.data);
            }

            status.value = 'success';
            lastFetched.value = new Date().toISOString();

        } catch (err) {
            if (axios.isCancel(err)) return;

            if (retry && attempt <= retry) {
                return await handleRetry(err, attempt, retry, retryDelay, (nextAttempt) =>
                    request(payload, queryParams, overridePage, nextAttempt)
                );
            }

            if (typeof onError === 'function') {
                const customHandledError = onError(err);
                if (customHandledError) {
                    error.value = customHandledError;
                    status.value = 'error';
                    data.value = null;
                    return;
                }
            }

            const errorMsg = err.response?.data?.message || err.response?.data?.errors || err.message;
            error.value = Array.isArray(errorMsg) ? errorMsg : [errorMsg];
            status.value = 'error';
            data.value = null;

            // Auto-alert for errors
            const errAlertPayload = err.response?.data?.alertifyPayload || err.response?.data?.dataPayload?.alertify;
            if (errAlertPayload) {
                const alertStore = useAlertStore();
                alertStore.show(errAlertPayload);
            }

        } finally {
            progress.value = 0;

            if (typeof onComplete === 'function') {
                onComplete({
                    status: status.value,
                    data: data.value,
                    error: error.value
                });
            }
        }
    };

    /**
     * Batch requests
     */
    const batchRequest = async (requests = [], batchOptions = {}) => {
        const { failFast = false, enableCache: batchCache = false, useAuth: batchAuth = true, onComplete: batchOnComplete = null } = batchOptions;
        status.value = 'loading';
        error.value = null;
        data.value = [];
        progress.value = 0;

        controller = new AbortController();
        const clientToUse = batchAuth ? apiClient : axios;
        const results = [];

        for (let i = 0; i < requests.length; i++) {
            const req = requests[i];
            const queryString = buildQueryString(req.queryParams);
            const fullUrl = `${req.url}${queryString}`;

            if (batchCache && req.method?.toUpperCase() === 'GET') {
                const cachedData = getCache(fullUrl);
                if (cachedData) {
                    results.push({ success: true, data: cachedData, requestName: req.requestName || null, cached: true });
                    progress.value = Math.round(((i + 1) / requests.length) * 100);
                    continue;
                }
            }

            const reqConfig = {
                method: req.method?.toUpperCase() || 'GET',
                url: fullUrl,
                headers: {
                    ...(options.headers || {}),
                    ...req.headers,
                    ...(manualToken ? { Authorization: `Bearer ${manualToken}` } : {})
                },
                signal: controller.signal,
                ...(req.payload ? { data: req.payload } : {}),
                timeout
            };

            try {
                const res = await clientToUse(reqConfig);
                const transformed = req.transform ? req.transform(res.data) : res.data;

                if (batchCache && reqConfig.method === 'GET') {
                    setCache(fullUrl, transformed);
                }

                results.push({ success: true, data: transformed, requestName: req.requestName || null });
            } catch (err) {
                results.push({ success: false, error: err.response?.data || [err.message], statusCode: err.response?.status, requestName: req.requestName || null });
                if (failFast) break;
            }

            progress.value = Math.round(((i + 1) / requests.length) * 100);
        }

        data.value = results;
        status.value = 'success';
        lastFetched.value = new Date().toISOString();

        if (typeof batchOnComplete === 'function') {
            batchOnComplete({ status: status.value, data: data.value, error: error.value });
        }

        return results;
    };

    // Auto-fetch trigger
    watch(() => [baseUrl, method], () => {
        if (method.toUpperCase() === 'GET' && autoFetch) {
            request();
        }
    }, { immediate: true });

    const refresh = async () => {
        status.value = 'loading';
        if (enableCache) clearCacheForUrl(baseUrl);
        await request();
        status.value = 'refreshed';
    };

    const clear = () => {
        data.value = null;
        error.value = null;
        status.value = 'idle';
    };

    const abort = () => {
        if (controller) {
            controller.abort();
            controller = null;
            status.value = 'aborted';
            if (typeof onAbort === 'function') onAbort();
        }
    };

    const nextPage = async () => {
        if (!pagination || (totalItems.value && currentPage.value * perPage.value >= totalItems.value)) return;
        currentPage.value += 1;
        await request(null, {}, currentPage.value);
    };

    const prevPage = async () => {
        if (!pagination || currentPage.value <= 1) return;
        currentPage.value -= 1;
        await request(null, {}, currentPage.value);
    };

    const goToPage = async (page) => {
        if (!pagination || page < 1) return;
        currentPage.value = page;
        await request(null, {}, page);
    };

    const setPerPage = async (newPerPage) => {
        if (!pagination) return;
        perPage.value = newPerPage;
        currentPage.value = 1;
        await request(null, {}, currentPage.value);
    };

    return {
        data,
        error,
        status,
        lastFetched,
        isOnline,
        request,
        batchRequest,
        refresh,
        clear,
        abort,
        clearAllCache,
        listCacheKeys,
        clearCacheMatching,
        isLoading: computed(() => status.value === 'loading'),
        isError: computed(() => status.value === 'error'),
        isSuccess: computed(() => status.value === 'success'),
        progress: computed(() => progress.value),
        ...(pagination ? {
            currentPage,
            perPage,
            totalItems,
            nextPage,
            prevPage,
            goToPage,
            setPerPage,
            totalPages: computed(() => totalItems.value ? Math.ceil(totalItems.value / perPage.value) : null),
        } : {})
    };
}

export default useApi;
