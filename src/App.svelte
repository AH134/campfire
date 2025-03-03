<script lang="ts">
import IconLink from "./lib/components/IconLink.svelte"
</script>

<header
    class="flex items-center justify-between border-b border-b-zinc-200 bg-white p-2 align-middle shadow"
>
    <div>
        <a class="flex items-center gap-1 align-middle" href="/">
            <img class="h-8 w-8" src="/bonfire.png" alt="logo" />
            <h1 class="text-lg font-semibold">Campfire</h1>
        </a>
    </div>

    <nav>
        <ul>
            <li>
                <IconLink
                    name="github"
                    href="https://github.com/AH134/campfire"
                    awesomeIcon="fa-brands fa-github fa-xl"
                />
            </li>
        </ul>
    </nav>
</header>

<main class="flex-1 p-2"></main>

<footer
    class=" mt-auto min-h-10 border-t border-t-zinc-200 bg-white p-2 text-center"
>
    <span>
        Created with
        <a
            class="text-blue-600 hover:text-zinc-800"
            href="https://svelte.dev"
            target="_blank">svelte</a
        >,
        <a
            class="text-blue-600 hover:text-zinc-800"
            href="https://tailwindcss.com"
            target="_blank">tailwindcss</a
        >
        &
        <a
            class="text-blue-600 hover:text-zinc-800"
            href="https://fontawesome.com"
            target="_blank">font awesome</a
        >
    </span>
</footer>
