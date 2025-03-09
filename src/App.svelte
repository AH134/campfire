<script lang="ts">
import { onMount } from "svelte";
import IconLink from "./lib/components/IconLink.svelte";
import Link from "./lib/components/Link.svelte";
import ServiceContainer from "./lib/components/ServiceContainer.svelte";
import ServiceItem from "./lib/components/ServiceItem.svelte";
import type { DashboardConfig } from "./lib/utils/config/configSchema";
import {
    CONFIG_PATH,
    loadDashboardConfig,
} from "./lib/utils/config/dashboardConfig";
import ThemeToggle from "./lib/components/ThemeToggle.svelte";
import {
    COLOR_THEMES,
    setColorScheme,
    setTheme,
    type ColorScheme,
} from "./lib/utils/colorScheme";

let dashboardConfig = loadDashboardConfig(CONFIG_PATH);
let searchTerm = $state("");
let colorTheme: ColorScheme = $state(null);

onMount(() => {
    colorTheme = setColorScheme();
});

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
    class="dark:bg-mine-shaft-950 dark:border-b-mine-shaft-900 border-b border-b-zinc-200 bg-white p-3 text-zinc-700 drop-shadow-sm dark:text-zinc-100"
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

        <nav>
            <ul class="flex items-center">
                <li>
                    <input
                        class="dark:bg-mine-shaft-950 dark:border-mine-shaft-900 mr-1 hidden rounded-md border bg-white p-1 shadow-sm sm:block dark:text-zinc-100"
                        type="search"
                        placeholder="Search..."
                        bind:value={searchTerm}
                    />
                </li>
                <li>
                    <IconLink
                        ariaLabel="github"
                        href="https://github.com/AH134/campfire"
                        awesomeIcon="fa-brands fa-github fa-xl fa-fw"
                    />
                </li>
                <li>
                    <ThemeToggle
                        theme={colorTheme}
                        handleSwitchTheme={() => {
                            setTheme(colorTheme);
                            colorTheme = colorTheme === COLOR_THEMES.DARK ? COLOR_THEMES.LIGHT : COLOR_THEMES.DARK;
                        }}
                    />
                </li>
            </ul>
        </nav>
    </div>
</header>

<main class="dark:bg-woodsmoke-950 flex-1 bg-zinc-100 p-3 text-zinc-700">
    <div class="m-auto md:max-w-screen-2xl md:p-2">
        {#await dashboardConfig then dashboardResult}
            {#if !dashboardResult.success}
                <div class="dark:bg-mine-shaft-950 rounded bg-white p-2 shadow">
                    <h1 class="text-lg font-semibold text-red-500">
                        Error loading configuration
                    </h1>
                    <pre
                        class="text-wrap dark:text-zinc-100">{dashboardResult
                            .error.message}</pre>
                </div>
            {:else}
                <input
                    class="dark:bg-mine-shaft-950 dark:border-mine-shaft-900 mb-4 rounded-md border bg-white p-1 shadow-sm sm:hidden dark:text-zinc-100"
                    type="search"
                    placeholder="Search..."
                    bind:value={searchTerm}
                />
                <div class="gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3">
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
    class="dark:bg-mine-shaft-950 dark:border-t-mine-shaft-900 mt-auto min-h-10 border-t border-t-zinc-200 bg-white p-3 text-center text-zinc-700 dark:text-zinc-100"
>
    <span>
        Created with
        <Link text="svelte" href="https://svelte.dev" />,
        <Link text="tailwindcss" href="https://tailwindcss.com" />
        &
        <Link text="font awesome" href="https://fontawesome.com" />
    </span>
</footer>
