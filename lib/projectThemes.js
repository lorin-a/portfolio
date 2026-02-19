/**
 * Project Theme Configuration
 *
 * Centralized color mappings for project cards in FeaturedWork.
 * Each theme defines CSS custom property values for card styling.
 *
 * To add a new project theme:
 * 1. Add a new key matching the project's theme identifier
 * 2. Define cardBg, title, subtitle, description, cta colors
 * 3. Set darkTheme: true if the background is dark (affects tag pill styling)
 * 4. Optionally add badgeBg/badgeText for status badge overrides
 * 5. Optionally add contentBg for small card content area gradients
 */

export const themes = {
  groundswell: {
    // Brand purple #554E65
    cardBg: '#554E65',
    title: '#EDE8F2',
    subtitle: '#EDE8F2',
    description: '#EDE8F2',
    cta: '#EDE8F2',
    badgeBg: '#E4E0EB',
    badgeText: '#3A3347',
    darkTheme: true,
  },
  birthstory: {
    // Soft periwinkle #B7CAFA
    cardBg: '#B7CAFA',
    title: '#1E2E50',
    subtitle: '#34486E',
    description: '#1E2E50',
    cta: '#2A4068',
    darkTheme: false,
  },
  transitionDesign: {
    // Soft chartreuse #C7D57C
    cardBg: '#C7D57C',
    title: '#2A3410',
    subtitle: '#3E4E1E',
    description: '#2A3410',
    cta: '#3E4E1E',
    darkTheme: false,
  },
  somebuddy: {
    cardBg: 'linear-gradient(135deg, #3830AA 0%, #2E28A0 100%)',
    contentBg: 'linear-gradient(to bottom, #2E28A0 0%, #252080 100%)',
    title: '#E8E4FF',
    subtitle: '#E8E4FF',
    description: '#E8E4FF',
    cta: '#C8FF78',
    darkTheme: true,
  },
  bridgingTheGap: {
    cardBg: 'linear-gradient(135deg, #1A2840 0%, #162238 100%)',
    contentBg: 'linear-gradient(to bottom, #162238 0%, #0E1828 100%)',
    title: '#E0E8F0',
    subtitle: '#E0E8F0',
    description: '#E0E8F0',
    cta: '#78C8FF',
    darkTheme: true,
  },
  mindfulnest: {
    // Soft blue #ADCAF5
    cardBg: '#ADCAF5',
    title: '#1A2E50',
    subtitle: '#34486E',
    description: '#1A2E50',
    cta: '#2A4068',
    darkTheme: false,
  },
}
