<template>
  <div class="drawer fixed top-0 left-0 z-50 h-screen">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col m-0 p-0">
      <!-- Navbar -->
      <div class="navbar bg-base-300 w-full p-0">
        <div class="flex-none lg:hidden">
          <label
            for="my-drawer-2"
            aria-label="open sidebar"
            class="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-6 w-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div class="mx-2 flex-1 px-2 flex gap-2">
          <img
            class="w-12"
            src="/src/assets/images/icons/webIcon.webp"
            alt=""
          />
          <h1>Stratagema</h1>
        </div>
        <div class="hidden flex-none lg:block px-6">
          <ul class="menu menu-horizontal flex gap-10">
            <!-- Navbar menu content here -->
            <template v-for="link in navLinks" :key="link.path">
              <RouterLink class="relative no-underline group" :to="link.path">
                <h2
                  class="cursor-pointer text-text transition-colors duration-300 group-hover:text-tertiary"
                >
                  {{ link.name }}
                </h2>

                <span
                  class="absolute left-0 -bottom-1 h-[2px] w-0 bg-tertiary transition-all duration-300 group-hover:w-full"
                ></span>
              </RouterLink>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <div class="drawer-side top-0 left-0 h-screen">
      <label
        for="my-drawer-2"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu bg-base-200 min-h-full w-48 p-4 m-0 gap-4">
        <!-- Sidebar content here -->
        <template v-for="link in navLinks" :key="link.path">
          <RouterLink class="no-underline" :to="link.path">
            <h2 class="cursor-pointer text-text">
              {{ link.name }}
            </h2>
          </RouterLink>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup>
const navLinks = [
  { name: "Home", path: "/" },
  { name: "Characters", path: "/characters" },
  { name: "Weapons", path: "/weapons" },
  { name: "Artifacts", path: "/artifacts" },
];
</script>
