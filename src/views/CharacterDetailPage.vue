<template>
  <LoadingSpinner v-if="loading" />
  <template v-else-if="character">
    <div
      class="bg-primary rounded-2xl px-3 py-8 md:p-8 relative overflow-hidden"
    >
      <CharacterSplashArt :character="character" />
      <div class="relative z-10 space-y-10">
        <CharacterBasicInfo :character="character" />
        <CharacterInfo :character="character" />
        <div class="space-y-8 md:space-y-0 md:flex md:gap-8">
          <CharacterArtifacts :character="character" />
          <CharacterWeapons :character="character" />
        </div>
        <CharacterBuild :character="character" />
        <CharacterMaterials :character="character" />
      </div>
    </div>
  </template>
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
import CharacterInfo from "@/components/CharacterDetail/CharacterInfo.vue";
import CharacterWeapons from "@/components/CharacterDetail/CharacterWeapons.vue";
import CharacterArtifacts from "@/components/CharacterDetail/CharacterArtifacts.vue";
import CharacterBuild from "@/components/CharacterDetail/CharacterBuild.vue";
import CharacterMaterials from "@/components/CharacterDetail/CharacterMaterials.vue";
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
        `*,
        regions:character_region(region(name)),
        affiliations:character_affiliation(affiliation(name)),
        voices:voice_actors(language, name, link),
        weapon_type(name, img_url),
        signature_dish:signature_dish(*),
        artifacts:character_artifact(artifact(*, two_piece_effect(name)), rank),
        weapons:character_weapon(weapon(name, base_attack, bonus_effect_type, bonus_effect_value, img_url), rank),
        builds:builds(character, details, title, stat:build_stat(build, slot, stat, rank)),
        ascensions:character_ascension(material_ascension(*), amount),
        enhancements:character_enhancement(material_enhancements(*), amount),
        talents:character_talent(material_talents(*), amount),
        local_specialty:character_local_specialty(local_specialty(*)),
        level_up_material:character_level_up_material(level_up_material(*), amount)
        `,
      )
      .eq("id", characterId)
      .single();
    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;
    if (data.artifacts) {
      data.artifacts.sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));
    }
    if (data.weapons) {
      data.weapons.sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));
    }
    character.value = data;
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
