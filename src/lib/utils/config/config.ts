import { CONFIG_ERROR, CONFIG_PATH } from "./constants";
import type { Result } from "../../types/result.types";

/**
 * Retrieves and parses the `config.yml` file from a specified path (default
 * path: `/data/config.yml`).
 *
 * This function checks if the content is valid YAML (`text/yaml`) and returns
 * the file content if successful. If the content type is invalid or the request
 * fails, an error is returned.
 *
 * @example
 *     const configText = await getConfigYamlFile();
 *     if (!configText.ok) {
 *         // Handle error: `configText.error` contains the error object
 *         const error: Error = configText.error;
 *         console.error("Failed to fetch config:", error.message);
 *     } else {
 *         // Handle success: `configText.value` contains the YAML content
 *         const value: string = configText.value;
 *         console.log("Config loaded successfully:", value);
 *     }
 *
 * @returns A `Result` object:
 *
 *   - `ok: true` with the `config.yml` content as a string on success.
 *   - `ok: false` with an error if the content type is invalid or the fetch fails.
 *
 * @see {@link Result} for the returned data structure.
 */
export const getConfigYamlFile = async (): Promise<Result<string>> => {
    const res = await fetch(CONFIG_PATH);
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
};
