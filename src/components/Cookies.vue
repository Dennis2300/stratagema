<template>
  <transition name="slide-up">
    <div
      v-if="showPopup"
      class="bg-primary fixed bottom-0 left-0 right-0 w-full shadow-2xl z-50"
    >
      <div class="container mx-auto px-6 py-6 flex items-center justify-between gap-6">
        <div class="flex items-center gap-4">
          <div class="text-5xl">🍪</div>
          <div class="flex-1">
            <h2 class="text-xl font-semibold text-white mb-2">We use cookies</h2>
            <p class="text-white/90 text-sm leading-relaxed">
              We use cookies to enhance your browsing experience, serve personalized content, 
              and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              <a href="#privacy" class="underline hover:text-white/70">Learn more</a>
            </p>
          </div>
        </div>
        <div class="flex gap-3 flex-shrink-0">
          <button 
            @click="handleDecline"
            class="px-6 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-all"
          >
            Decline
          </button>
          <button 
            @click="handleAccept"
            class="px-6 py-2.5 bg-white text-primary hover:bg-white/90 rounded-lg font-medium transition-all"
          >
            Accept All
          </button>
        </div>
      </div>
      <button 
        @click="closePopup"
        class="absolute top-4 right-4 text-white hover:text-white/70 text-2xl font-bold transition-colors"
        aria-label="Close cookie popup"
      >
        ×
      </button>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showPopup = ref(false);

onMounted(() => {
  const consent = localStorage.getItem('cookieConsent');
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
  localStorage.setItem('cookieConsent', 'accepted');
  console.log('Cookies accepted');
  closePopup();
};

const handleDecline = () => {
  localStorage.setItem('cookieConsent', 'declined');
  console.log('Cookies declined');
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