<script lang="ts">
import type { Service } from "../utils/config/configSchema";
import ServiceItem from "./ServiceItem.svelte";

let { name, icon, items }: Service = $props();
</script>

<div class="mb-8">
    <div class="mb-4 dark:text-zinc-100">
        <i class="{icon} text-2xl"></i>
        <span class="ml-1 text-2xl">{name}</span>
    </div>
    <div>
        {#each items as item, index (index)}
            <ServiceItem {...item} />
        {/each}
    </div>
</div>
