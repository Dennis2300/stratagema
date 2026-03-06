<template>
  <nav
    class="drawer fixed top-0 left-0 z-50 w-full transition-transform duration-300"
    :class="{ '-translate-y-full': isHidden }"
  >
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <div class="navbar bg-primary w-full p-0">
        <!-- Mobile hamburger -->
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
              />
            </svg>
          </label>
        </div>
        <!-- Logo -->
        <div class="flex-1">
          <RouterLink
            to="/"
            class="flex gap-2 no-underline text-text pl-4 cursor-pointer w-fit items-center"
          >
            <img
              class="w-12"
              src="/src/assets/images/icons/webIcon.webp"
              alt=""
            />
            <h1 class="cursor-pointer font-acme">Stratagema</h1>
          </RouterLink>
        </div>
        <!-- Desktop nav -->
        <div class="hidden flex-none lg:block pr-4">
          <ul class="menu menu-horizontal flex gap-10 items-center">
            <template v-for="link in navLinks" :key="link.path">
              <RouterLink class="relative no-underline group" :to="link.path">
                <h2
                  class="cursor-pointer text-text transition-colors duration-300 group-hover:text-tertiary"
                >
                  {{ link.name }}
                </h2>
                <span
                  class="absolute left-0 -bottom-1 h-[2px] w-0 bg-tertiary transition-all duration-300 group-hover:w-full"
                />
              </RouterLink>
            </template>
            <!-- More dropdown -->
            <div class="dropdown dropdown-end">
              <div
                tabindex="0"
                role="button"
                class="relative group cursor-pointer"
              >
                <h2
                  class="text-text transition-colors duration-300 group-hover:text-tertiary cursor-pointer"
                >
                  More
                </h2>
                <span
                  class="absolute left-0 -bottom-1 h-[2px] w-0 bg-tertiary transition-all duration-300 group-hover:w-full"
                />
              </div>
              <ul
                tabindex="0"
                class="dropdown-content menu bg-secondary rounded-box z-10 w-40 p-2 shadow-md space-y-1"
              >
                <template v-for="link in moreNavLinks" :key="link.path">
                  <li>
                    <RouterLink
                      class="relative no-underline group px-2 py-1"
                      :to="link.path"
                    >
                      <h2
                        class="text-text transition-colors duration-300 group-hover:text-tertiary cursor-pointer"
                      >
                        {{ link.name }}
                      </h2>
                    </RouterLink>
                  </li>
                </template>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </div>
    <!-- Mobile sidebar -->
    <div class="drawer-side">
      <label
        for="my-drawer-2"
        aria-label="close sidebar"
        class="drawer-overlay"
      />
      <ul class="menu bg-base-200 min-h-full w-48 p-4 m-0 gap-4">
        <template
          v-for="link in [...navLinks, ...moreNavLinks]"
          :key="link.path"
        >
          <RouterLink class="no-underline" :to="link.path">
            <h2 class="cursor-pointer text-text">{{ link.name }}</h2>
          </RouterLink>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Characters", path: "/characters" },
  { name: "Weapons", path: "/weapons" },
  { name: "Artifacts", path: "/artifacts" },
];

const moreNavLinks = [
  { name: "Codes", path: "/promo-codes" },
  { name: "Patreon", path: "/patreon" },
];

const isHidden = ref(false);
let lastScrollY = 0;

function handleScroll() {
  const currentScrollY = window.scrollY;
  isHidden.value = currentScrollY > lastScrollY && currentScrollY > 80;
  lastScrollY = currentScrollY;
}

onMounted(() =>
  window.addEventListener("scroll", handleScroll, { passive: true }),
);
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>
