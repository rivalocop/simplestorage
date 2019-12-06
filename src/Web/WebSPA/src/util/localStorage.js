export const LOCAL_STORAGE_KEY = {
  USER_ID: 'userID',
  USER_NAME: 'userName'
};

export function getValueFromStorageByKey(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function setValueToStorageByKey(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
