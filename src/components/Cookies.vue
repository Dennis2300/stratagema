<template>
  <transition name="slide-up">
    <div
      v-if="showPopup"
      class="bg-gray-700 fixed bottom-0 left-0 right-0 w-full shadow-2xl z-50"
    >
      <div class="container mx-auto px-4 py-4 sm:px-6 sm:py-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <!-- Content Section -->
          <div class="flex items-start sm:items-center gap-3 sm:gap-4">
            <div class="text-4xl sm:text-5xl flex-shrink-0">🍪</div>
            <div class="flex-1">
              <h2 class="text-lg sm:text-xl font-semibold text-white mb-1.5 sm:mb-2">
                We use cookies
              </h2>
              <p class="text-white/90 text-sm leading-relaxed">
                We use cookies to enhance your browsing experience, serve
                personalized content, and analyze our traffic. By clicking "Accept
                All", you consent to our use of cookies.
                <router-link
                  to="privacy-policy"
                  class="underline hover:text-white/70"
                >
                  Learn More
                </router-link>
              </p>
            </div>
          </div>

          <!-- Buttons Section -->
          <div class="flex gap-3 justify-around sm:justify-start sm:flex-shrink-0">
            <button
              @click="handleDecline"
              class="btn btn-soft btn-error transition-all"
            >
              Decline
            </button>
            <button
              @click="handleAccept"
              class="btn btn-soft btn-success transition-all"
            >
              Accept All
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

const handleAccept = () => {
  localStorage.setItem("cookieConsent", "accepted");
  console.log("Cookies accepted");
  closePopup();
};

const handleDecline = () => {
  localStorage.setItem("cookieConsent", "declined");
  console.log("Cookies declined");
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