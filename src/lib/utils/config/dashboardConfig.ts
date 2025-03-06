import type { Result } from "../../types/result.types";
import yaml, { YAMLException } from "js-yaml";
import { DashboardConfigSchema, type DashboardConfig } from "./configSchema";
import { ZodError } from "zod";

export const CONFIG_FILE_NAME = "config.yml";
export const CONFIG_PATH = "/data/config.yml";

export const enum CONFIG_ERROR {
    FETCH_ERROR_MSG = "The config.yml file does not exist or has an incorrect file extension.",
    PARSE_ERROR_MSG = "Failed to parse config.yml. Please ensure the YAML formar is correct.",
}

export const getYamlConfig = async (
    configPath: string
): Promise<Result<string>> => {
    try {
        const response = await fetch(configPath);
        const yamlContent = await response.text();
        console.log(response);

        return {
            success: true,
            data: yamlContent,
        };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error
                    : new Error(CONFIG_ERROR.FETCH_ERROR_MSG),
        };
    }
};

export const parseConfig = (config: string): Result<DashboardConfig> => {
    try {
        const dashboardConfig = yaml.load(config) as DashboardConfig;
        DashboardConfigSchema.parse(dashboardConfig);
        return {
            success: true,
            data: dashboardConfig,
        };
    } catch (error) {
        let formatError;
        if (error instanceof ZodError) {
            formatError = new Error(
                `${CONFIG_ERROR.PARSE_ERROR_MSG}\nDebug info: ZodError\n${error.message}`
            );
        } else if (error instanceof YAMLException) {
            formatError = new Error(
                `${CONFIG_ERROR.PARSE_ERROR_MSG}\nDebug info: YAMLException\n${error.message}`
            );
        } else {
            formatError = new Error(
                `${CONFIG_ERROR.PARSE_ERROR_MSG}\nDebug info: Fetch()`
            );
        }

        return {
            success: false,
            error: formatError,
        };
    }
};

export const loadDashboardConfig = async (configPath: string) => {
    const configContent = await getYamlConfig(configPath);
    // return the Result object with error
    if (!configContent.success) {
        return configContent;
    }

    const dashboardConfig = parseConfig(configContent.data);
    return dashboardConfig;
};
