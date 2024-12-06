import * as SecureStore from 'expo-secure-store';

export const isWeb = typeof window !== 'undefined';

/**
 * Gets an item from storage.
 * @param key - The key of the item to retrieve.
 * @returns A promise that resolves with the value of the item or null if it doesn't exist.
 */
export const getItem = async (key: string): Promise<string | null> => {
    if (isWeb) {
        return Promise.resolve(localStorage.getItem(key));
    } else {
        return SecureStore.getItemAsync(key);
    }
};

/**
 * Sets an item in storage.
 * @param key - The key of the item to store.
 * @param value - The value of the item to store.
 * @returns A promise that resolves when the item is stored.
 */
export const setItem = async (key: string, value: string): Promise<void> => {
    if (isWeb) {
        localStorage.setItem(key, value);
    } else {
        await SecureStore.setItemAsync(key, value);
    }
};

/**
 * Deletes an item from storage.
 * @param key - The key of the item to delete.
 * @returns A promise that resolves when the item is deleted.
 */
export const deleteItem = async (key: string): Promise<void> => {
    if (isWeb) {
        localStorage.removeItem(key);
    } else {
        await SecureStore.deleteItemAsync(key);
    }
};
