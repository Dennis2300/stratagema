<template>
  <nav class="navbar w-full bg-primary fixed top-0 z-50">
    <label
      for="my-drawer-4"
      aria-label="open sidebar"
      class="btn btn-square btn-ghost"
    >
      <!-- Sidebar toggle icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="2"
        fill="none"
        stroke="currentColor"
        class="my-1.5 inline-block size-4"
      >
        <path
          d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
        ></path>
        <path d="M9 4v16"></path>
        <path d="M14 10l2 2l-2 2"></path>
      </svg>
    </label>
    <div class="px-4">
      <RouterLink
        to="/"
        class="flex gap-2 no-underline text-text pl-4 cursor-pointer w-fit items-center"
      >
        <img class="w-12" src="/src/assets/images/icons/webIcon.webp" alt="" />
        <h1 class="cursor-pointer font-acme">Stratagema</h1>
      </RouterLink>
    </div>
  </nav>
</template>
