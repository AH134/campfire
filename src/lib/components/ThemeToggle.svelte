<script lang="ts">
  import { COLOR_THEMES } from "../utils/colorScheme";

  type ToggleThemeProps = {
    theme: string | null;
    handleSwitchTheme: () => void;
  };

  let { theme, handleSwitchTheme }: ToggleThemeProps = $props();
</script>

<button
  class="inline-flex aspect-square min-h-6 min-w-6 items-center justify-center rounded-sm p-0.5 hover:bg-zinc-200 dark:hover:bg-mine-shaft-900"
  onclick={handleSwitchTheme}
>
  {#if theme === COLOR_THEMES.LIGHT}
    <i
      aria-label="toggle-light-theme"
      class="fa-solid fa-moon fa-xl fa-fw fa-rotate-by"
      style="--fa-rotate-angle: -20deg;"
    ></i>
  {:else}
    <i
      aria-label="toggle-dark-theme"
      class="fa-solid fa-sun fa-xl fa-fw fa-rotate-by"
      style="--fa-rotate-angle: -20deg;"
    ></i>
  {/if}
</button>
