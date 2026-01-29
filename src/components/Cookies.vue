<template>
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
</template>

<script setup>
const emit = defineEmits(['accept', 'decline']);

const handleAccept = () => {
  localStorage.setItem('cookieConsent', 'accepted');
  emit('accept');
};

const handleDecline = () => {
  localStorage.setItem('cookieConsent', 'declined');
  emit('decline');
};
</script>