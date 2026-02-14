<template>
  <LoadingSpinner v-if="loading" />
  <div
    v-else-if="character"
    class="bg-primary rounded-2xl p-8 relative overflow-hidden"
  >
    <CharacterSplashArt :character="character" />
    <CharacterBasicInfo :character="character" />
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
