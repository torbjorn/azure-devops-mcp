// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { packageVersion } from "./version.js";

export const apiVersion = "7.2-preview.1";
export const batchApiVersion = "5.0";
export const userAgent = `AzureDevOps.MCP/${packageVersion} (local)`

/**
 * Helper function to extract string values from Azure DevOps enum objects
 * for use with z.enum() instead of z.nativeEnum() which generates numeric values
 */
export function getEnumStringValues<T extends Record<string, string | number>>(enumObj: T): string[] {
  return Object.keys(enumObj).filter(key => isNaN(Number(key)));
}

/**
 * Helper function to convert string value back to enum value
 */
export function getEnumValue<T extends Record<string, string | number>>(enumObj: T, stringValue: string | undefined): T[keyof T] | undefined {
  if (stringValue === undefined) {
    return undefined;
  }
  return enumObj[stringValue as keyof T];
}
