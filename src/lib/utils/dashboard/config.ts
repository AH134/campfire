import { CONFIG_ERROR } from "./constants";
import type { Result } from "../../types/result.types";
import type { DashboardConfig } from "../../types/config.types";
import yaml, { YAMLException } from "js-yaml";

export const getConfigYamlFile = async (
    configPath: string
): Promise<Result<string>> => {
    try {
        const res = await fetch(configPath);
        const contentType = res.headers.get("content-type");

        const isYaml = contentType && contentType.includes("text/yaml");
        if (!isYaml) {
            return {
                ok: false,
                error: new Error(CONFIG_ERROR.FETCH_ERROR_MESSAGE),
            };
        }

        const configText = await res.text();

        return {
            ok: true,
            value: configText,
        };
    } catch (e) {
        return {
            ok: false,
            error:
                e instanceof Error
                    ? e
                    : new Error(CONFIG_ERROR.FETCH_ERROR_MESSAGE),
        };
    }
};

export const parseConfig = (configText: string): Result<DashboardConfig> => {
    try {
        const config = yaml.load(configText) as DashboardConfig;

        return {
            ok: true,
            value: config,
        };
    } catch (e) {
        return {
            ok: false,
            error:
                e instanceof Error || e instanceof YAMLException
                    ? e
                    : new Error(CONFIG_ERROR.PARSE_ERROR_MESSAGE),
        };
    }
};

export const loadDashboardConfig = async (configPath: string) => {
    const configResult = await getConfigYamlFile(configPath);
    if (!configResult.ok) {
        return configResult;
    }

    const dashboardConfig = parseConfig(configResult.value);
    return dashboardConfig;
};
