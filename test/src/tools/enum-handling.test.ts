// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { configureBuildTools } from "../../../src/tools/builds";
import { configureReleaseTools } from "../../../src/tools/releases";
import { WebApi } from "azure-devops-node-api";
import { AccessToken } from "@azure/identity";

jest.mock("azure-devops-node-api");
jest.mock("@azure/identity");

describe("Enum handling in tools", () => {
  let mockServer: jest.Mocked<McpServer>;
  let mockTokenProvider: jest.Mock;
  let mockConnectionProvider: jest.Mock;
  let mockConnection: jest.Mocked<WebApi>;
  let mockBuildApi: any;
  let mockReleaseApi: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockServer = {
      tool: jest.fn(),
    } as any;

    mockTokenProvider = jest.fn().mockResolvedValue({
      token: "mock-token",
    } as AccessToken);

    mockBuildApi = {
      getDefinitions: jest.fn(),
      getBuilds: jest.fn(),
    };

    mockReleaseApi = {
      getReleaseDefinitions: jest.fn(),
      getReleases: jest.fn(),
    };

    mockConnection = {
      getBuildApi: jest.fn().mockResolvedValue(mockBuildApi),
      getReleaseApi: jest.fn().mockResolvedValue(mockReleaseApi),
    } as any;

    mockConnectionProvider = jest.fn().mockResolvedValue(mockConnection);
  });

  describe("Build tools enum handling", () => {
    it("should convert string enum values to numeric enum values for getDefinitions", async () => {
      configureBuildTools(mockServer, mockTokenProvider, mockConnectionProvider);
      
      const buildDefinitionsCall = (mockServer.tool as jest.Mock).mock.calls.find(
        ([toolName]) => toolName === "build_get_definitions"
      );
      
      expect(buildDefinitionsCall).toBeDefined();
      const [, , , handler] = buildDefinitionsCall;
      
      mockBuildApi.getDefinitions.mockResolvedValue([]);
      
      await handler({
        project: "test-project",
        queryOrder: "LastModifiedAscending"
      });
      
      // Verify that the API was called with the numeric enum value
      expect(mockBuildApi.getDefinitions).toHaveBeenCalledWith(
        "test-project",
        undefined, // name
        undefined, // repositoryId
        undefined, // repositoryType
        1, // queryOrder - should be the numeric value for LastModifiedAscending
        undefined, // top
        undefined, // continuationToken
        undefined, // minMetricsTime
        undefined, // definitionIds
        undefined, // path
        undefined, // builtAfter
        undefined, // notBuiltAfter
        undefined, // includeAllProperties
        undefined, // includeLatestBuilds
        undefined, // taskIdFilter
        undefined, // processType
        undefined  // yamlFilename
      );
    });

    it("should convert string enum values to numeric enum values for getBuilds", async () => {
      configureBuildTools(mockServer, mockTokenProvider, mockConnectionProvider);
      
      const getBuildsCall = (mockServer.tool as jest.Mock).mock.calls.find(
        ([toolName]) => toolName === "build_get_builds"
      );
      
      expect(getBuildsCall).toBeDefined();
      const [, , , handler] = getBuildsCall;
      
      mockBuildApi.getBuilds.mockResolvedValue([]);
      
      await handler({
        project: "test-project",
        queryOrder: "QueueTimeDescending"
      });
      
      // Verify that the API was called with the numeric enum value
      expect(mockBuildApi.getBuilds).toHaveBeenCalledWith(
        "test-project",
        undefined, // definitions
        undefined, // queues
        undefined, // buildNumber
        undefined, // minTime
        undefined, // maxTime
        undefined, // requestedFor
        undefined, // reasonFilter
        undefined, // statusFilter
        undefined, // resultFilter
        undefined, // tagFilters
        undefined, // properties
        undefined, // top
        undefined, // continuationToken
        undefined, // maxBuildsPerDefinition
        undefined, // deletedFilter
        4, // queryOrder - should be the numeric value for QueueTimeDescending
        undefined, // branchName
        undefined, // buildIds
        undefined, // repositoryId
        undefined  // repositoryType
      );
    });
  });

  describe("Release tools enum handling", () => {
    it("should convert string enum values to numeric enum values for getReleaseDefinitions", async () => {
      configureReleaseTools(mockServer, mockTokenProvider, mockConnectionProvider);
      
      const getReleaseDefinitionsCall = (mockServer.tool as jest.Mock).mock.calls.find(
        ([toolName]) => toolName === "release_get_definitions"
      );
      
      expect(getReleaseDefinitionsCall).toBeDefined();
      const [, , , handler] = getReleaseDefinitionsCall;
      
      mockReleaseApi.getReleaseDefinitions.mockResolvedValue([]);
      
      await handler({
        project: "test-project",
        expand: "Environments",
        queryOrder: "NameAscending"
      });
      
      // Verify that the API was called with the numeric enum values
      expect(mockReleaseApi.getReleaseDefinitions).toHaveBeenCalledWith(
        "test-project",
        undefined, // searchText
        2, // expand - should be the numeric value for Environments
        undefined, // artifactType
        undefined, // artifactSourceId
        undefined, // top
        undefined, // continuationToken
        2, // queryOrder - should be the numeric value for NameAscending
        undefined, // path
        undefined, // isExactNameMatch - this is undefined, not false
        undefined, // tagFilter
        undefined, // propertyFilters
        undefined, // definitionIdFilter
        undefined, // isDeleted - this is undefined, not false
        undefined  // searchTextContainsFolderName
      );
    });

    it("should convert string enum values to numeric enum values for getReleases", async () => {
      configureReleaseTools(mockServer, mockTokenProvider, mockConnectionProvider);
      
      const getReleasesCall = (mockServer.tool as jest.Mock).mock.calls.find(
        ([toolName]) => toolName === "release_get_releases"
      );
      
      expect(getReleasesCall).toBeDefined();
      const [, , , handler] = getReleasesCall;
      
      mockReleaseApi.getReleases.mockResolvedValue([]);
      
      await handler({
        project: "test-project",
        statusFilter: "Active",
        queryOrder: "Ascending",
        expand: "Artifacts"
      });
      
      // Verify that the API was called with the numeric enum values
      expect(mockReleaseApi.getReleases).toHaveBeenCalledWith(
        "test-project",
        undefined, // definitionId
        undefined, // definitionEnvironmentId
        undefined, // searchText
        undefined, // createdBy
        2, // statusFilter - should be the numeric value for Active
        undefined, // environmentStatusFilter
        undefined, // minCreatedTime - this is undefined, not a Date
        undefined, // maxCreatedTime - this is undefined, not a Date
        1, // queryOrder - should be the numeric value for Ascending
        undefined, // top
        undefined, // continuationToken
        4, // expand - should be the numeric value for Artifacts
        undefined, // artifactTypeId
        undefined, // sourceId
        undefined, // artifactVersionId
        undefined, // sourceBranchFilter
        undefined, // isDeleted - this is undefined, not false
        undefined, // tagFilter
        undefined, // propertyFilters
        undefined, // releaseIdFilter
        undefined  // path
      );
    });
  });
});