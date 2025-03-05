<script lang="ts">
import type { Item } from "../types/config.types";

let { name, subtitle, logo, url }: Item = $props();
</script>

<div
    class="mb-3 translate-y-0.5 rounded-md bg-white shadow-md duration-300 ease-in-out hover:-translate-y-0.5 hover:transition-all"
>
    <a href={url}>
        <div class="flex h-20 items-center gap-3 p-2">
            <img class="h-14 w-14" src={logo} alt={logo} />
            <div class="inline-block truncate">
                <h1 class="truncate text-lg font-semibold">{name}</h1>
                <span class="font-light">{subtitle}</span>
            </div>
        </div>
    </a>
</div>
