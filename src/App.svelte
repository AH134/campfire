<script lang="ts">
import IconLink from "./lib/components/IconLink.svelte";
import Link from "./lib/components/Link.svelte";
import ServiceContainer from "./lib/components/ServiceContainer.svelte";
import { getServices } from "./lib/utils/config/services";

let servicesResult = getServices();
$inspect(servicesResult);
</script>

<header
    class="flex min-h-16 items-center justify-between border-b border-b-zinc-200 bg-white p-3 align-middle text-zinc-700 shadow"
>
    <div>
        <a class="flex items-center gap-1 align-middle" href="/">
            <img class="h-10 w-10" src="/bonfire.png" alt="logo" />
            <h1 class="text-2xl font-semibold tracking-wide">Campfire</h1>
        </a>
    </div>

    <nav>
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
</header>

<main class="flex-1 bg-zinc-100 p-3 text-zinc-700">
    {#await servicesResult}
        <p>Loading data...</p>
    {:then result}
        {#if !result.ok}
            <p>{JSON.stringify(result.error)}</p>
        {:else}
            {#each result.value as service, index (index)}
                <ServiceContainer {...service} />
            {/each}
        {/if}
    {/await}
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
