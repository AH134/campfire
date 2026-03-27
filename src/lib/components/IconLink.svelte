<script lang="ts">
  type IconProps = {
    ariaLabel: string;
    href: string;
    awesomeIcon: string;
  };

  let { ariaLabel, href, awesomeIcon }: IconProps = $props();
</script>

<a
  class="inline-flex aspect-square min-h-6 min-w-6 items-center justify-center rounded-sm p-0.5 hover:bg-zinc-200 dark:hover:bg-mine-shaft-900"
  {href}
  target="_blank"
  aria-label="{ariaLabel} link"
>
  <i class={awesomeIcon}></i>
</a>
