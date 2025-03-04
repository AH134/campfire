import yaml, { YAMLException } from "js-yaml";
import type { Service, ServiceYamlSchema } from "../types/services.types";
import type { Result } from "../types/result.types";

const yamlFile = "services.yml";
const getServiceYamlFile = async (): Promise<Result<string>> => {
    const res = await fetch("/data/" + yamlFile);
    const contentType = await res.headers.get("content-type");

    const isYaml = contentType && contentType.includes("text/yaml");
    if (!isYaml) {
        return {
            ok: false,
            error: new Error(
                "services.yml file does not exist or ensure that the file extension is .yml."
            ),
        };
    }

    const serviceData = await res.text();
    return {
        ok: true,
        value: serviceData,
    };
};

export const getServices = async (): Promise<Result<Service[]>> => {
    const servicesData = await getServiceYamlFile();
    if (!servicesData.ok) {
        return servicesData;
    }

    const servicesText = servicesData.value;
    try {
        const servicesObj = yaml.load(servicesText) as ServiceYamlSchema;
        return { ok: true, value: servicesObj.services };
    } catch (e) {
        let err = "Unknown error.";
        if (e instanceof YAMLException || e instanceof Error) {
            err = e.message;
        }

        return {
            ok: false,
            error: new Error(`Failed to load services.yml: ${err}`),
        };
    }
};
