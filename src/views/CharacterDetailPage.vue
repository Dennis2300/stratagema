<template>
  <LoadingSpinner v-if="loading" />
  <template v-else-if="character">
    <div
      class="max-w-[1400px] mx-auto rounded-2xl p-8 relative overflow-hidden"
    >
      <CharacterSplashArt :character="character" />
      <div class="relative z-10 space-y-10">
        <CharacterBasicInfo :character="character" />
        <CharacterInfo :character="character" />
        <div
          v-if="
            character.artifacts?.length > 0 || character.weapons?.length > 0
          "
          class="space-y-8 md:space-y-0 md:flex md:gap-8"
        >
          <CharacterArtifacts
            :character="character"
            v-if="character.artifacts?.length > 0"
          />
          <CharacterWeapons
            :character="character"
            v-if="character.weapons?.length > 0"
          />
        </div>
        <CharacterBuild :character="character" />
        <CharacterMaterials :character="character" />
        <CharacterTeams :character="character" />
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
import CharacterTeams from "@/components/CharacterDetail/CharacterTeams.vue";
import CharacterNotFound from "@/components/CharacterDetail/CharacterNotFound.vue";

const route = useRoute();
const loading = ref(null);
const error = ref(null);
const character = ref(null);

const CHARACTER_SELECT = `
  *,
  vision(name, img_url),
  weapon_type(name, img_url),
  regions:character_region(region(name)),
  affiliations:character_affiliation(affiliation(name)),
  voices:voice_actors(language, name, link),
  signature_dish:signature_dish(*),
  artifacts:character_artifact(artifact(*, two_piece_effect(name)), rank),
  weapons:character_weapon(weapon(name, rarity, base_attack, bonus_effect_type, bonus_effect_value, img_url), rank),
  builds:builds(character, details, title, stat:build_stat(build, slot, stat, rank)),
  ascensions:character_ascension(material_ascension(*), amount),
  enhancements:character_enhancement(material_enhancements(*), amount),
  talents:character_talent(material_talents(*), amount),
  local_specialty:character_local_specialty(local_specialty(*)),
  level_up_material:character_level_up_material(level_up_material(*), amount)
`;

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

function sortByRank(data) {
  const byRank = (a, b) => (a.rank ?? 0) - (b.rank ?? 0);
  if (data.artifacts) data.artifacts.sort(byRank);
  if (data.weapons) data.weapons.sort(byRank);
}

function getCharacterIdFromRoute() {
  const id = route.params.id;
  if (!id) {
    error.value = "No character ID found in route.";
    return null;
  }
  return id;
}

async function fetchCharacterById(characterId) {
  loading.value = true;
  try {
    const { data, error: fetchError } = await supabase
      .from("characters")
      .select(CHARACTER_SELECT)
      .eq("id", characterId)
      .single();

    if (fetchError) throw fetchError;

    sortByRank(data);
    character.value = data;
    // cache(data);
  } catch (err) {
    error.value = err.message || "Failed to load character";
  } finally {
    loading.value = false;
    console.log(character.value);
  }
}

onMounted(async () => {
  const characterId = getCharacterIdFromRoute();
  if (!characterId) return;
  await fetchCharacterById(characterId);
});
</script>
