<script lang="ts">
type LinkProps = {
    text: string;
    href: string;
};

let { text, href }: LinkProps = $props();
</script>

<a
    class="text-blue-500 hover:text-zinc-800 dark:hover:text-zinc-100"
    href={href}
    target="_blank">{text}</a
>
