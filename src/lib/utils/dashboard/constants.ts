export const CONFIG_YAML = "config.yml";

export const CONFIG_PATH = "/data/config.yml";

export const enum CONFIG_ERROR {
    DEFAULT_ERROR_MESSAGE = "Something went wrong!",
    FETCH_ERROR_MESSAGE = "The config.yml file does not exist or has an incorrect file extension.",
    PARSE_ERROR_MESSAGE = "Failed to parse config.yml. Please ensure the YAML format is correct.",
}
