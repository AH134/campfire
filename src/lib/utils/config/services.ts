import yaml, { YAMLException } from "js-yaml";
import type { Service, ConfigSchema } from "../../types/config.types";
import type { Result } from "../../types/result.types";
import { getConfigYamlFile } from "./config";
import { CONFIG_ERROR } from "./constants";

export const getServices = async (): Promise<Result<Service[]>> => {
    const config = await getConfigYamlFile();
    if (!config.ok) {
        return config;
    }

    const configData = config.value;
    try {
        const configObj = yaml.load(configData) as ConfigSchema;
        return { ok: true, value: configObj.services };
    } catch (e) {
        let errorMsg: string = CONFIG_ERROR.DEFAULT_ERROR_MESSAGE;
        if (e instanceof YAMLException) {
            errorMsg = CONFIG_ERROR.PARSE_ERROR_MESSAGE;
        }

        return {
            ok: false,
            error: new Error(errorMsg),
        };
    }
};
