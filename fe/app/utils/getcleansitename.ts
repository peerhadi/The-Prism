export default function getCleanSiteName(urlInput: string) {
  try {
    // 1. Safely parse the URL to extract the hostname (e.g., "://nytimes.com")
    const hostname = new URL(urlInput).hostname;

    // 2. Remove "www." and the top-level domain (like ".com", ".org", ".co.uk")
    const mainDomain = hostname.replace(/^(www\.)?([^.]+)\..*$/, "$2");

    // 3. Capitalize the first letter
    return mainDomain.charAt(0).toUpperCase() + mainDomain.slice(1);
  } catch (error) {
    return "Invalid URL";
  }
}
