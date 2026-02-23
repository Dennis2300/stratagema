<template>
  <transition name="slide-up">
    <div
      v-if="showPopup"
      class="fixed bottom-0 left-0 right-0 w-full bg-gray-800 shadow-lg z-50"
    >
      <div class="max-w-5xl mx-auto px-4 py-4">
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <!-- Content Section -->
          <div class="flex items-start sm:items-center gap-3">
            <span class="text-2xl leading-tight">🍪</span>
            <div>
              <h2 class="text-white font-semibold text-sm sm:text-base mb-0.5">
                Just so you know
              </h2>
              <p class="text-white/80 text-xs sm:text-sm leading-relaxed">
                We collect anonymous usage data (pages visited, traffic sources)
                to help improve this site. No personal info is ever collected or
                shared.
                <router-link
                  to="privacy-policy"
                  class="underline hover:text-white"
                  >Learn More</router-link
                >
              </p>
            </div>
          </div>
          <!-- Button Section -->
          <div class="flex-shrink-0 self-center sm:self-auto">
            <button
              @click="handleAcknowledge"
              class="w-full sm:w-auto px-5 py-2 bg-white text-gray-800 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from "vue";

const showPopup = ref(false);

onMounted(() => {
  const consent = localStorage.getItem("cookieConsent");
  if (!consent) {
    setTimeout(() => {
      showPopup.value = true;
    }, 500);
  }
});

const closePopup = () => {
  showPopup.value = false;
};

const handleAcknowledge = () => {
  localStorage.setItem("cookieConsent", "acknowledged");
  closePopup();
};
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
