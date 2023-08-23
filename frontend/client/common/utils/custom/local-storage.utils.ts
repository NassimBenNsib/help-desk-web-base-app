class LocalStorageUtils {
  static get(key: String): String | null {
    try {
      return localStorage.getItem(key.toString());
    } catch (error) {
      return null;
    }
  }

  static set(key: String, value: String): Boolean {
    try {
      localStorage.setItem(key.toString(), value.toString());
      return true;
    } catch (error) {
      return false;
    }
  }

  static remove(key: String): Boolean {
    try {
      localStorage.removeItem(key.toString());
      return true;
    } catch (error) {
      return false;
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {}
  }
}

export { LocalStorageUtils };
