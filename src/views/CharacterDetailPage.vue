<template>
  <LoadingSpinner v-if="loading" />
  <div
    v-else-if="character"
    class="bg-primary rounded-2xl p-8 relative overflow-hidden"
  >
    <div class="absolute top-0 left-0 right-0 rounded-t-2xl overflow-hidden">
      <img
        class="w-full opacity-10"
        :src="character.splash_art_url"
        :alt="character.name"
      />
    </div>
    <div class="relative z-10 space-y-4">
      <section class="space-y-4 md:flex">
        <div class="flex flex-col items-center md:w-2/3">
          <div
            class="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden"
            :class="{
              'rarity-5': character.rarity === 5,
              'rarity-4': character.rarity === 4,
            }"
          >
            <img
              class="w-full h-full object-cover rounded-full"
              :src="character.img_url"
              :alt="character.name"
            />
          </div>
          <h1 class="">{{ character.name }}</h1>
          <div class="flex flex-wrap justify-center gap-2">
            <p class="badge badge-primary">{{ character.vision }}</p>
            <p class="badge badge-primary">{{ character.weapon_type.name }}</p>
            <p class="badge badge-primary">{{ character.role }}</p>
            <p class="badge badge-primary">{{ character.main_stat }}</p>
          </div>
        </div>
        <div class="space-y-2 md:w-1/3 md:flex md:flex-col md:justify-center">
          <h2 class="divider py-2">Voice Actors</h2>
          <template v-for="voice in character.voices" :key="voice.name">
            <div class="flex items-center gap-2 pl-4">
              <span :class="`fi fi-${voice.language} text-xl`"></span>
              <p>{{ voice.name }}</p>
            </div>
          </template>
        </div>
      </section>
      <section class="space-y-4">
        <div class="flex flex-col gap-2">
          <h2>Regions</h2>
          <template v-for="a in character.regions" :key="a.region.name">
            <p class="badge badge-primary">{{ a.region.name }}</p>
          </template>
        </div>
        <div class="flex flex-col gap-2">
          <h2>Affiliations</h2>
          <template
            v-for="a in character.affiliations"
            :key="a.affiliation.name"
          >
            <p class="badge badge-primary">{{ a.affiliation.name }}</p>
          </template>
        </div>
      </section>
    </div>
  </div>
  <CharacterNotFound v-else />
</template>

<script setup>
import { supabase } from "@/supabaseClient";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import "flag-icons/css/flag-icons.min.css";

// Page Loading component
import LoadingSpinner from "../components/Loadings/LoadingSpinner.vue";

// Character Detail Components
import CharacterSplashArt from "@/components/CharacterDetail/CharacterSplashArt.vue";
import CharacterBasicInfo from "@/components/CharacterDetail/CharacterBasicInfo.vue";
import CharacterRegions from "@/components/CharacterDetail/CharacterRegions.vue";
import CharacterAffiliation from "@/components/CharacterDetail/CharacterAffiliation.vue";
import CharacterInfo from "@/components/CharacterDetail/CharacterInfo.vue";
import CharacterWeapons from "@/components/CharacterDetail/CharacterWeapons.vue";
import CharacterArtifacts from "@/components/CharacterDetail/CharacterArtifacts.vue";
import CharacterBuild from "@/components/CharacterDetail/CharacterBuild.vue";
import CharacterMaterials from "@/components/CharacterDetail/CharacterMaterials.vue";
import CharacterVoiceActors from "@/components/CharacterDetail/CharacterVoiceActors.vue";
import CharacterNotFound from "@/components/CharacterDetail/CharacterNotFound.vue";

const route = useRoute();
const loading = ref(null);
const error = ref(null);

const character = ref(null);

const languages = [
  { label: "English", code: "us" },
  { label: "Japanese", code: "jp" },
  { label: "Chinese", code: "cn" },
  { label: "Korean", code: "kr" },
];

// To Use Later in Production
function cache(key, data = null, ttl = 24 * 60 * 60 * 1000) {
  const now = new Date().getTime();
  if (data) {
    const item = {
      data,
      expiry: now + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
    return data;
  } else {
    const cachedItem = localStorage.getItem(key);
    if (!cachedItem) return null;

    const parsedItem = JSON.parse(cachedItem);
    if (now > parsedItem.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return parsedItem.data;
  }
}

function checkCharacterId() {
  const characterId = route.params.id;
  if (!characterId) {
    error.value = "No character ID found in route.";
    return null; // return null if invalid
  }
  return characterId;
}

async function fetchCharacterById(characterId) {
  loading.value = true;
  try {
    // The Supabase Query
    let query = supabase
      .from("characters")
      .select(
        `
  *,
  regions:character_region(region(name)),
  affiliations:character_affiliation(affiliation(name)),
  voices:voice_actors(language, name, link),
  weapon_type(name, img_url)
`,
      )
      .eq("id", characterId)
      .single();

    // The Fetch to Supabase
    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;

    // Sort Artifacts and Weapons by the rank column
    if (data.artifacts) {
      data.artifacts.sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));
    }

    if (data.weapons) {
      data.weapons.sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));
    }

    // Insert the Fetched Data to Character State
    character.value = data;

    // Session Storage for Caching
    sessionStorage.setItem(
      "character",
      JSON.stringify({
        characters: character.value,
      }),
    );
  } catch (err) {
    error.value = err.message || "Failed to load character";
  } finally {
    loading.value = false;
    console.log(character.value);
  }
}

onMounted(async () => {
  const characterId = checkCharacterId();
  if (!characterId) return;
  await fetchCharacterById(characterId);
});
</script>

<style scoped>
.rarity-5 {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow:
    0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}

.rarity-4 {
  background: linear-gradient(145deg, #9b72d5, #7149a3);
  box-shadow:
    0px 0px 15px rgba(155, 114, 213, 0.8),
    0px 0px 30px rgba(155, 114, 213, 0.5);
}
</style>
