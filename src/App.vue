<template>
  <div class="min-h-screen">
    <SideBar class="fixed left-0 top-0 w-64 h-screen" />
    <div class="ml-56 flex flex-col min-h-screen">
      <main class="flex-1">
        <router-view />
      </main>
      <Footer />
    </div>
    <SupportPopUp />
    <transition name="slide-up">
      <div
        v-if="cookiesPopUp"
        class="bg-primary fixed bottom-0 left-0 right-0 w-full shadow-2xl z-50"
      >
        <Cookies @accept="handleCookieAccept" @decline="handleCookieDecline" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import SideBar from "./components/SideBar.vue";
import Footer from "./components/Footer.vue";
import SupportPopUp from "./components/SupportPopUp.vue";
import Cookies from "./components/Cookies.vue";
import { ref, onMounted } from "vue";

const cookiesPopUp = ref(false);

onMounted(() => {
  const consent = localStorage.getItem("cookieConsent");
  if (!consent) {
    setTimeout(() => {
      cookiesPopUp.value = true;
    }, 500);
  }
});

function closeCookiesPopUp() {
  cookiesPopUp.value = false;
}

function handleCookieAccept() {
  console.log("Cookies accepted");
  closeCookiesPopUp();
}

function handleCookieDecline() {
  console.log("Cookies declined");
  closeCookiesPopUp();
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.4s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
}
</style>
