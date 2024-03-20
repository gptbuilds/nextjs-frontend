import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

export function toBlogSlug(str: string) {
  if (!str) return null;
  // Convert the string to lowercase and trim it
  let slug = str.toLowerCase().trim();

  // Replace non-alphanumeric characters with dashes
  slug = slug.replace(/[^a-z0-9]+/g, "-");

  // Remove leading and trailing dashes
  slug = slug.replace(/^-+|-+$/g, "");

  // Truncate to the nearest complete word within 20 characters if possible
  if (slug.length > 20) {
    let truncatedSlug = slug.substr(0, 20);
    // Find the last dash in the truncated string to avoid breaking a word
    let lastDash = truncatedSlug.lastIndexOf("-");
    // If a dash is found and it's not at the end, truncate up to the last dash
    if (lastDash > 0) {
      slug = truncatedSlug.substr(0, lastDash);
    } else {
      // If no dash or it's at the end, just use the truncated slug
      slug = truncatedSlug;
    }
  }

  return slug;
}

export function formatPhoneNumber(number: string) {
  // Remove all non-digit characters from the number
  if (!number) return;
  number = number?.replace(/\D/g, "");

  // Check if the number is valid
  if (number?.length !== 10) {
    return "Invalid phone number";
  }

  // Format the number as 1 (xxx) xxx-xxxx
  var formattedNumber =
    "1 (" +
    number.substring(0, 3) +
    ") " +
    number.substring(3, 6) +
    "-" +
    number.substring(6, 10);

  return formattedNumber;
}
