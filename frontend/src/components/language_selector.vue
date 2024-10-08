<template>
  <div class="relative inline-block text-left text-secondary">
    <div>
      <i @click="toggleDropdown" type="button" class="inline-flex items-center justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-secondary hover:text-webSecondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="language-menu" aria-expanded="true" aria-haspopup="true">
        <i class="pi pi-language font-extrabold text-xl mr-2 text-secondary"></i>
        {{ languageNames[selectedLanguage] }}
        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </i>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="isOpen" class="origin-top-right z-50 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-cardDark ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="language-menu">
        <div class="py-1" role="none">
          <a v-for="lang in availableLanguages" :key="lang" @click="changeLanguage(lang)" :class="['block px-4 py-2 text-sm cursor-pointer', selectedLanguage === lang ? 'text-secondary font-extrabold' : 'text-secondary hover:text-gray-900']" role="menuitem">
            {{ languageNames[lang] }}
          </a>
        </div>
      </div>
    </transition>
  </div>

  <p class="mt-4 text-xl font-medium">{{ translationKeys.Hello }}</p>
</template>

<script>
import { ref, computed } from 'vue';
import { translationKeys, availableLanguages, getLanguage, setLanguage } from '../executables/translation';

export default {
  setup() {
    const selectedLanguage = ref(getLanguage());
    const isOpen = ref(false);

    const languageNames = {
      en: 'Eng',
      ja: '日本語',
      ch: '中文',
      es: 'Español',
      fr: 'Français',
      pt: 'Português',
      sw: 'Kiswahili',
      ny: 'Chichewa',
      yao: 'Chiyao',
      sena: 'Chisena',
      tumbuka: 'Chitumbuka'
    };

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const changeLanguage = (lang) => {
      selectedLanguage.value = lang;
      setLanguage(lang);
      isOpen.value = false;
      // Force component re-render
      Object.assign({}, translationKeys);
      window.location.reload();
    };

    return {
      selectedLanguage,
      availableLanguages,
      languageNames,
      changeLanguage,
      translationKeys,
      isOpen,
      toggleDropdown
    };
  }
}
</script>