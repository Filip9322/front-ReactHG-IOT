/**
 * Check for URL queries as well for matching
 * Current URL & Item Path
 *
 * @param item
 * @param activeItem
 */

// ** Const
const now = new Date();

export const handleURLQueries = (router, path) => {
  if (Object.keys(router.query).length && path) {
    const arr = Object.keys(router.query)

    return router.asPath.includes(path) && router.asPath.includes(router.query[arr[0]]) && path !== '/'
  }

  return false
}

export const getWithExpiry = (key) => {
  if (typeof window !== 'undefined') {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) {
      return null;
    }
    
    const item = JSON.parse(itemStr);
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } else { return null; }
}