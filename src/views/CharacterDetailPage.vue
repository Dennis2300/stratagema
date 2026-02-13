<template>
  <LoadingSpinner v-if="loading" />
  <div
    v-else-if="character"
    class="relative min-h-screen bg-primary rounded-2xl"
  >
    <p
      v-if="character.is_upcoming"
      class="text-center py-4 underline text-red-700"
    >
      Preview content - details may change before release
    </p>
    <CharacterSplashArt :character="character" />
    <div
      class="relative z-10 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto py-8 space-y-8 md:space-y-0"
    >
      <div class="flex flex-col lg:flex-row justify-between">
        <!-- Hero Section -->
        <div class="lg:w-3/5 flex items-center">
          <CharacterBasicInfo :character="character" />
        </div>
        <!-- Voice Actors -->
        <div class="lg:w-2/5">
          <CharacterVoiceActors :character="character" />
        </div>
      </div>
      <CharacterRegions :character="character" />
      <CharacterAffiliation :character="character" />
      <CharacterInfo :character="character" />
      <CharacterArtifacts :character="character" />
      <CharacterWeapons :character="character" />
      <CharacterBuild :character="character" />
      <CharacterMaterials :character="character" />
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
        signature_dish(id, name, image_url, url, description),
        vision:visions(*),
        main_stat:stats(*),
        weapon_type:weaponTypes(*),
        released_region(id, name),
        va:voiceActors(*, lang(*)),
        regions:character_region(region_id(name, image_url)),
        affiliations:character_affiliation(affiliation_id(name)),
        builds(*, build_stat(*, stat_id(name), rank), title),
        artifacts:character_artifact(*, artifact_id(id, name, two_piece(name), four_piece, flower_img_url)),
        weapons:character_weapon(*, weapon_id(id, name, rarity, base_attack, image_url, bonus_effect_type(name), bonus_effect_value)),
        ascension_mats:character_ascension(*, materials_ascension_id(name, img_url)),
        exp_mats:character_exp(*, materials_exp_id(name, img_url)),
        level_up_mats:character_level_up(*, materials_level_up_id(name, img_url)),
        talent_mats:character_talent(*, materials_talent_id(name, img_url)),
        enhancement_mats:character_enhancement(*, materials_enhancement_id(name, img_url)),
        local_specialty:character_local_specialty(*, local_specialty_id(name, img_url)),
        role:role(id, name),
        is_upcoming
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
    console.log(character);
  }
}

onMounted(async () => {
  const characterId = checkCharacterId();
  if (!characterId) return;
  await fetchCharacterById(characterId);
});
</script>
