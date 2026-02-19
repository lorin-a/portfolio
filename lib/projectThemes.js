/**
 * Project Theme Configuration
 *
 * Centralized color mappings for project cards in FeaturedWork.
 * Each theme defines CSS custom property values for card styling.
 *
 * Text color convention:
 * - Dark cards (darkTheme: true): use #F7F7F7 (--cream) for all text
 * - Light cards (darkTheme: false): use #2C2C28 (--text-heading) for all text
 * - Tag pills: always #F7F7F7 bg + #2C2C28 text regardless of card theme
 *
 * To add a new project theme:
 * 1. Add a new key matching the project's theme identifier
 * 2. Define cardBg — title/subtitle/description/cta will use standard light or dark text
 * 3. Set darkTheme: true if the background is dark
 * 4. Optionally add badgeBg/badgeText for status badge overrides
 * 5. Optionally add contentBg for small card content area gradients
 */

const LIGHT_TEXT = '#F7F7F7'  // --cream
const DARK_TEXT = '#2C2C28'   // --text-heading

export const themes = {
  groundswell: {
    // Brand purple #554E65
    cardBg: '#554E65',
    title: LIGHT_TEXT,
    subtitle: LIGHT_TEXT,
    description: LIGHT_TEXT,
    cta: LIGHT_TEXT,
    badgeBg: '#E4E0EB',
    badgeText: DARK_TEXT,
    darkTheme: true,
    tagBg: LIGHT_TEXT,
    tagText: DARK_TEXT,
  },
  birthstory: {
    // Soft periwinkle #B7CAFA
    cardBg: '#B7CAFA',
    title: DARK_TEXT,
    subtitle: DARK_TEXT,
    description: DARK_TEXT,
    cta: DARK_TEXT,
    darkTheme: false,
    tagBg: LIGHT_TEXT,
    tagText: DARK_TEXT,
  },
  transitionDesign: {
    // Soft chartreuse #C7D57C
    cardBg: '#C7D57C',
    title: DARK_TEXT,
    subtitle: DARK_TEXT,
    description: DARK_TEXT,
    cta: DARK_TEXT,
    darkTheme: false,
    tagBg: LIGHT_TEXT,
    tagText: DARK_TEXT,
  },
  somebuddy: {
    cardBg: 'linear-gradient(135deg, #3830AA 0%, #2E28A0 100%)',
    contentBg: 'linear-gradient(to bottom, #2E28A0 0%, #252080 100%)',
    title: LIGHT_TEXT,
    subtitle: LIGHT_TEXT,
    description: LIGHT_TEXT,
    cta: LIGHT_TEXT,
    darkTheme: true,
    tagBg: LIGHT_TEXT,
    tagText: DARK_TEXT,
  },
  bridgingTheGap: {
    cardBg: 'linear-gradient(135deg, #1A2840 0%, #162238 100%)',
    contentBg: 'linear-gradient(to bottom, #162238 0%, #0E1828 100%)',
    title: LIGHT_TEXT,
    subtitle: LIGHT_TEXT,
    description: LIGHT_TEXT,
    cta: LIGHT_TEXT,
    darkTheme: true,
    tagBg: LIGHT_TEXT,
    tagText: DARK_TEXT,
  },
  mindfulnest: {
    // Soft blue #ADCAF5
    cardBg: '#ADCAF5',
    title: DARK_TEXT,
    subtitle: DARK_TEXT,
    description: DARK_TEXT,
    cta: DARK_TEXT,
    darkTheme: false,
    tagBg: LIGHT_TEXT,
    tagText: DARK_TEXT,
  },
}
