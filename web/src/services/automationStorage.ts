interface SavedAutomation {
  id: string;
  name: string;
  steps: any[];
  createdAt: Date;
  updatedAt: Date;
}

class AutomationStorageService {
  private dbName = 'AutomationDB';
  private version = 1;
  private storeName = 'automations';
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('name', 'name', { unique: false });
          store.createIndex('createdAt', 'createdAt', { unique: false });
        }
      };
    });
  }

  async saveAutomation(name: string, steps: any[]): Promise<string> {
    if (!this.db) await this.init();

    const automation: SavedAutomation = {
      id: `automation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      steps,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(automation);

      request.onsuccess = () => resolve(automation.id);
      request.onerror = () => reject(request.error);
    });
  }

  async updateAutomation(id: string, name: string, steps: any[]): Promise<void> {
    if (!this.db) await this.init();

    const automation = await this.getAutomation(id);
    if (!automation) throw new Error('Automation not found');

    automation.name = name;
    automation.steps = steps;
    automation.updatedAt = new Date();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(automation);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getAutomation(id: string): Promise<SavedAutomation | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async getAllAutomations(): Promise<SavedAutomation[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteAutomation(id: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async exportToJSON(): Promise<string> {
    const automations = await this.getAllAutomations();
    return JSON.stringify({ automations }, null, 2);
  }

  async importFromJSON(jsonData: string): Promise<void> {
    const data = JSON.parse(jsonData);
    if (!data.automations || !Array.isArray(data.automations)) {
      throw new Error('Invalid JSON format');
    }

    if (!this.db) await this.init();

    const transaction = this.db!.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);

    // Clear existing data
    await new Promise<void>((resolve, reject) => {
      const clearRequest = store.clear();
      clearRequest.onsuccess = () => resolve();
      clearRequest.onerror = () => reject(clearRequest.error);
    });

    // Import new data
    for (const automation of data.automations) {
      automation.createdAt = new Date(automation.createdAt);
      automation.updatedAt = new Date(automation.updatedAt);
      await new Promise((resolve, reject) => {
        const request = store.add(automation);
        request.onsuccess = () => resolve(null);
        request.onerror = () => reject(request.error);
      });
    }
  }
}

export const automationStorage = new AutomationStorageService();
export type { SavedAutomation };
