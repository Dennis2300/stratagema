import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "./supabaseClient";

let localUser;

const routes = [
  { path: "/", component: () => import("./views/HomePage.vue") },
  {
    path: "/privacy-policy",
    component: () => import("./views/PrivacyPolicy.vue"),
  },
  { path: "/teams", component: () => import("./views/TeamsPage.vue") },
  { path: "/login", component: () => import("./views/LoginPage.vue") },
  {
    path: "/unauthorized",
    component: () => import("./views/UnauthorizedPage.vue"),
  },
  {
    path: "/characters",
    component: () => import("./views/CharactersPage.vue"),
  },
  {
    path: "/characters/:id",
    name: "CharacterDetailPage",
    component: () => import("./views/CharacterDetailPage.vue"),
  },
  { path: "/weapons", component: () => import("./views/WeaponsPage.vue") },
  {
    path: "/weapons/:id",
    name: "WeaponDetailPage",
    component: () => import("./views/WeaponDetailPage.vue"),
  },
  { path: "/artifacts", component: () => import("./views/ArtifactsPage.vue") },
  {
    path: "/contribute",
    name: "ContributePage",
    component: () => import("./views/ContributePage.vue"),
  },
  {
    path: "/current-banner",
    name: "CurrentBannerPage",
    component: () => import("./views/CurrentBannerPage.vue"),
  },
  {
    path: "/admin",
    component: () => import("./views/AdminPage.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from) {
    return { top: 0 };
  },
});

// Auth Logic
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      next("/unauthorized");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;