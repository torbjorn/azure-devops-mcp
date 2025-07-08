// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getEnumStringValues, getEnumValue } from "../../src/utils.js";
import { BuildQueryOrder, DefinitionQueryOrder } from "azure-devops-node-api/interfaces/BuildInterfaces.js";
import { 
  ReleaseDefinitionExpands, 
  ReleaseDefinitionQueryOrder, 
  ReleaseStatus, 
  ReleaseQueryOrder, 
  ReleaseExpands 
} from "azure-devops-node-api/interfaces/ReleaseInterfaces.js";

describe("utils", () => {
  describe("getEnumStringValues", () => {
    it("should extract string values from BuildQueryOrder enum", () => {
      const stringValues = getEnumStringValues(BuildQueryOrder);
      expect(stringValues).toEqual([
        "FinishTimeAscending",
        "FinishTimeDescending", 
        "QueueTimeDescending",
        "QueueTimeAscending",
        "StartTimeDescending",
        "StartTimeAscending"
      ]);
    });

    it("should extract string values from DefinitionQueryOrder enum", () => {
      const stringValues = getEnumStringValues(DefinitionQueryOrder);
      expect(stringValues).toEqual([
        "None",
        "LastModifiedAscending",
        "LastModifiedDescending",
        "DefinitionNameAscending",
        "DefinitionNameDescending"
      ]);
    });

    it("should extract string values from ReleaseDefinitionExpands enum", () => {
      const stringValues = getEnumStringValues(ReleaseDefinitionExpands);
      expect(stringValues).toEqual([
        "None",
        "Environments",
        "Artifacts",
        "Triggers",
        "Variables",
        "Tags",
        "LastRelease"
      ]);
    });

    it("should extract string values from ReleaseStatus enum", () => {
      const stringValues = getEnumStringValues(ReleaseStatus);
      expect(stringValues).toEqual([
        "Undefined",
        "Draft",
        "Active",
        "Abandoned"
      ]);
    });
  });

  describe("getEnumValue", () => {
    it("should convert string value back to enum value for BuildQueryOrder", () => {
      expect(getEnumValue(BuildQueryOrder, "QueueTimeDescending")).toBe(BuildQueryOrder.QueueTimeDescending);
      expect(getEnumValue(BuildQueryOrder, "FinishTimeAscending")).toBe(BuildQueryOrder.FinishTimeAscending);
    });

    it("should convert string value back to enum value for DefinitionQueryOrder", () => {
      expect(getEnumValue(DefinitionQueryOrder, "None")).toBe(DefinitionQueryOrder.None);
      expect(getEnumValue(DefinitionQueryOrder, "LastModifiedAscending")).toBe(DefinitionQueryOrder.LastModifiedAscending);
    });

    it("should convert string value back to enum value for ReleaseStatus", () => {
      expect(getEnumValue(ReleaseStatus, "Active")).toBe(ReleaseStatus.Active);
      expect(getEnumValue(ReleaseStatus, "Draft")).toBe(ReleaseStatus.Draft);
    });

    it("should return undefined for undefined input", () => {
      expect(getEnumValue(BuildQueryOrder, undefined)).toBe(undefined);
    });

    it("should return undefined for invalid string value", () => {
      expect(getEnumValue(BuildQueryOrder, "InvalidValue")).toBe(undefined);
    });
  });
});