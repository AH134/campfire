<script lang="ts">
import IconLink from "./lib/components/IconLink.svelte";
import Link from "./lib/components/Link.svelte";
import ServiceContainer from "./lib/components/ServiceContainer.svelte";
import ServiceItem from "./lib/components/ServiceItem.svelte";
import type { DashboardConfig } from "./lib/utils/config/configSchema";
import {
    CONFIG_PATH,
    loadDashboardConfig,
} from "./lib/utils/config/dashboardConfig";

let dashboardConfig = loadDashboardConfig(CONFIG_PATH);
let searchTerm = $state("");

const filterServiceItems = (config: DashboardConfig | null) => {
    if (!config) return [];

    const filteredItems = config.services
        .flatMap((service) => service.items)
        .filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
        );
    return filteredItems;
};
</script>

<header
    class="border-b border-b-zinc-200 bg-white p-3 text-zinc-700 drop-shadow-sm"
>
    <div
        class="m-auto flex items-center justify-between align-middle md:max-w-screen-2xl"
    >
        <div>
            <a class="flex items-center gap-1 align-middle" href="/">
                <img class="h-10 w-10" src="/bonfire.png" alt="logo" />
                <h1 class="text-2xl font-semibold tracking-wide">Campfire</h1>
            </a>
        </div>

        <nav class="flex gap-1">
            <input
                class="hidden rounded-md border bg-slate-50 p-1 sm:block"
                type="search"
                placeholder="Search..."
                bind:value={searchTerm}
            />
            <ul>
                <li>
                    <IconLink
                        ariaLabel="github"
                        href="https://github.com/AH134/campfire"
                        awesomeIcon="fa-brands fa-github fa-xl"
                    />
                </li>
            </ul>
        </nav>
    </div>
</header>

<main class="flex-1 bg-zinc-100 p-3 text-zinc-700">
    <div class="m-auto md:max-w-screen-2xl md:p-2">
        <input
            class="mb-4 rounded-md border bg-white p-1 shadow-sm sm:hidden"
            type="search"
            placeholder="Search..."
            bind:value={searchTerm}
        />
        {#await dashboardConfig then dashboardResult}
            {#if !dashboardResult.success}
                <div class="rounded bg-white p-2 shadow">
                    <h1 class="text-lg font-semibold text-red-500">
                        Error loading configuration
                    </h1>
                    <pre class="text-wrap">{dashboardResult.error.message}</pre>
                </div>
            {:else}
                <div class="grid-cols-3 gap-4 sm:grid">
                    {#if searchTerm === ""}
                        {#each dashboardResult.data.services as service, index (index)}
                            <ServiceContainer {...service} />
                        {/each}
                    {:else}
                        {#each filterServiceItems(dashboardResult.data) as item, index (index)}
                            <ServiceItem {...item} />
                        {/each}
                    {/if}
                </div>
            {/if}
        {/await}
    </div>
</main>

<footer
    class="mt-auto min-h-10 border-t border-t-zinc-200 bg-white p-3 text-center text-zinc-700"
>
    <span>
        Created with
        <Link text="svelte" href="https://svelte.dev" />,
        <Link text="tailwindcss" href="https://tailwindcss.com" />
        &
        <Link text="font awesome" href="https://fontawesome.com" />
    </span>
</footer>
