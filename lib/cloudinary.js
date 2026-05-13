const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dc17mvdyv'
const BASE = `https://res.cloudinary.com/${CLOUD_NAME}`

/** Cloudinary image URL with auto-format, auto-quality, and optional width */
export function cloudImg(publicId, width) {
  const transforms = width
    ? `f_auto,q_auto,w_${width}`
    : 'f_auto,q_auto'
  return `${BASE}/image/upload/${transforms}/${publicId}`
}

/** Cloudinary video URL. All sources are mp4 (pre-transcoded locally), so no
 *  format transform is needed — saves on transformation credits. */
export function cloudVideo(publicId, width) {
  const transforms = width ? `q_auto,w_${width}` : 'q_auto'
  return `${BASE}/video/upload/${transforms}/${publicId}`
}

/** Cloudinary audio URL (uses video resource type, no format transform) */
export function cloudAudio(publicId) {
  return `${BASE}/video/upload/${publicId}`
}

/*
 * Public ID mappings — Cloudinary renamed files on upload with random suffixes.
 * Keys = original filenames used in the codebase (without extension).
 * Values = Cloudinary public IDs.
 */

// ── Homepage ──
export const HOME_IMAGES = {
  'lorin-photo':             'lorin-photo_n6lhus',
  'lorin-photo-2':           'lorin-photo-2_fthags',
  'groundswell-hero':       'groundswell-hero_x6u8gm',
  'birthstory-cover':       'birthstory-cover_bl6cqu',
  'transition-design-hero': 'transition-design-hero_l30j93',
  'td-scales':              'Team_Autopoesis_4A-1',
  'td-timeline':            'Team_Autopoesis_FoodInsecurity_Timeline_2025-1',
  'td-stakeholders':        'Team_Autopoesis_Stakeholder_Relations-1',
  'somebuddy-cover':        'somebuddy-cover_dbf5it',
  'somebuddy-31':           '31',
  'somebuddy-28':           '28',
  'bridging-cover':         'bridging-cover_pikdr9',
  'btg-29':                 'BTG_29',
  'btg-36':                 'BTG_36',
  'btg-33':                 'BTG_33',
  'mindfulnest-hero':       'mindfulnest-hero_j8yrgc',
  'bs':                     'bs',
  'bs-2':                   'bs-2',
  'bs-3':                   'bs-3',
  'bs-4':                   'bs-4',
  'bs-5':                   'bs-5',
}

// ── Groundswell images ──
export const GS_IMAGES = {
  'gs-hero':                    'gs-hero_h1mlvv',
  'gs-cards':                   'gs-cards',
  'gs-ctb-detail-01':           'gs-ctb-detail-01_jimk3s',
  'gs-ctb-detail-02':           'gs-ctb-detail-02',
  'gs-ctb-detail-03':           'gs-ctb-detail-03',
  'groundswell-ctb-docs':       'groundswell-ctb-docs',
  'gs-ctb-email':               'gs-ctb-email',
  'gs-pod':                     'gs-pod',
  'gs-pod-detail-01':           'gs-pod-detail-01',
  'gs-pod-detail-02':           'gs-pod-detail-02_i1zw9r',
  'gs-pod-detail-03':           'gs-pod-detail-03_uyrecc',
  'Synthesis-diagram':          'Synthesis-diagram',
  'gs-artwall':                 'gs-artwall_kfw1u7',
  'gs-artwall-detail-01':       'gs-artwall-detail-01_p3xfco',
  'gs-artwall-detail-02':       'gs-artwall-detail-02_xjmxuc',
  'gs-artwall-detail-03':       'gs-artwall-detail-03_kvkbq4',
  'gs-install-upmc':            'gs-install-upmc_wlstdr',
  'gs-context-01':              'gs-context-01_hnvnm2',
  'gs-context-02':              'gs-context-02_wqdbg7',
  'gs-context-03':              'gs-context-03_dernuz',
  'gs-sense-affinity-01':       'gs-sense-affinity-01_yi82ei',
  'gs-sense-affinity-02':       'gs-sense-affinity-02_y2omqf',
  'gs-sense-affinity-03':       'gs-sense-affinity-03_aqflze',
  'gs-making-prototype-01':     'gs-making-prototype-01_kulb2w',
  'gs-making-mockup-01':        'gs-making-mockup-01_nzb49i',
  'gs-making-figma-01':         'gs-making-figma-01_g5ymtc',
  'gs-making-build-01':         'gs-making-build-01_ul2qgc',
  'gs-making-build-02':         'gs-making-build-02_lmzm3g',
  'gs-making-build-04':         'gs-making-build-04_deuius',
  'gs-making-build-05':         'gs-making-build-05_mekyvb',
  'gs-making-facade':           'gs-making-facade_ahgln6',
  'gs-making-install-01':       'gs-making-install-01_zcb80r',
  'gs-making-install-02':       'gs-making-install-02_wlhdum',
  'gs-playtest-01':             'gs-playtest-01_brnto9',
  'gs-playtest-03':             'gs-playtest-03_ljyzjs',
  'gs-finale':                  'gs-finale_l7efzg',
  'gs-workshop-flower-01':      'gs-workshop-flower-01_jqeodb',
  'gs-workshop-flower-02':      'gs-workshop-flower-02_jrvakq',
  'gs-workshop-coats-01':       'gs-workshop-coats-01_jtksty',
  'gs-workshop-coats-03':       'gs-workshop-coats-03_v6ahor',
  'gs-workshop-grief-01':       'gs-workshop-grief-01_qu1ikw',
  'gs-workshop-grief-02':       'gs-workshop-grief-02_nwovpx',
}

// ── Groundswell reflection cards ──
export const GS_CARDS = {
  'welcome-front':      'gs-card-welcome-front_jdcj8c',
  'welcome-back':       'gs-card-welcome-back_sxaxk1',
  'embrace-front':      'gs-card-embrace-front_uegfut',
  'embrace-back':       'gs-card-embrace-back_jhlf6a',
  'numb-front':         'gs-card-numb-front_h2vclu',
  'numb-back':          'gs-card-numb-back_bby2ds',
  'present-front':      'gs-card-present-front_jkkuis',
  'present-back':       'gs-card-present-back_tt2yuw',
  'angry-front':        'gs-card-angry-front_odxcml',
  'angry-back':         'gs-card-angry-back_habth0',
  'grateful-front':     'gs-card-grateful-front_bdim5p',
  'grateful-back':      'gs-card-grateful-back_ug4sag',
  'exhausted-front':    'gs-card-exhausted-front_dao9cy',
  'exhausted-back':     'gs-card-exhausted-back_y3yobf',
  'joyful-front':       'gs-card-joyful-front_tbztlj',
  'joyful-back':        'gs-card-joyful-back_tcsj6m',
  'invisible-front':    'gs-card-invisible-front_dmx7z1',
  'invisible-back':     'gs-card-invisible-back_ovpos5',
  'valued-front':       'gs-card-valued-front_evqda9',
  'valued-back':        'gs-card-valued-back_rgc6ix',
  'heartbroken-front':  'gs-card-heartbroken-front_cw22n8',
  'heartbroken-back':   'gs-card-heartbroken-back_j5rogk',
  'connected-front':    'gs-card-connected-front_zi1qgf',
  'connected-back':     'gs-card-connected-back_bjd63m',
  'vulnerable-front':   'gs-card-vulnerable-front_qhfuz1',
  'vulnerable-back':    'gs-card-vulnerable-back_qh77sb',
  'hopeful-front':      'gs-card-hopeful-front_doxlam',
  'hopeful-back':       'gs-card-hopeful-back_yiuvjl',
  'thankyou-front':     'gs-card-thankyou-front_l2efbr',
  'thankyou-back':      'gs-card-thankyou-back_ukuvod',
}

// ── Groundswell videos ──
export const GS_VIDEOS = {
  'gs-walkthrough-video': 'gs-walkthrough-video_bg8y0h',
  'gs-qr-library':        'gs-qr-library_qb6guc',
  'entrypage':             'entrypage_plrhhv',
  'moduleview':            'moduleview_egvqio',
  'popup':                 'popup_a85tun',
  'chartview':             'chartview_xftjdh',
  'displayview':           'displayview_k69crd',
  'admin':                 'admin_dumekc',
  'gs-card-flip':          'gs-card-flip',
  'gs-display-view':       'gs-display-view',
  'gs-pod-data':           'gs-pod-data',
  'gs-opener':             'gs-opener',
  'gs-intro-artwall':      'gs-intro-artwall',
  'gs-overlay':            'gs-overlay',
  'gs-new-meditations':    'New_Meditations',
}

// ── Groundswell audio ──
export const GS_AUDIO = {
  'gs-poem-remember':    'gs-poem-remember_psyfok',
  'gs-meditation-home':  'gs-meditation-home_rmkdmf',
}

// ── Homepage preview videos ──
export const HOME_VIDEOS = {
  'birthstory-default':          'birthstory-home-preview-default',
  'birthstory-hover':            'birthstory-home-preview-hover',
  'somebuddy-default':           'somebuddy-home-preview-default',
  'somebuddy-hover':             'somebuddy-home-preview-hover',
  'somebuddy-reel':              'somebuddy-reel',
  'somebuddy-reel-2':            'somebuddy-reel-2',
  'somebuddy-logo':              'Final_SomeBuddy_Animated_Logo',
  'transition-design-default':   'transition-design-home-preview-default',
  'transition-design-hover':     'transition-design-home-preview-hover',
  'bridging-default':            'Logos_1',
  'bridging-hover':              'GAP-video-home-preview-hover',
  'bridging-app-iphone':         'App_iPhone_Animated',
  'bridging-clip-2':             'BTG-Clip-2',
  'bridging-logos-2':            'Logos_2',
}

// ── Other videos ──
export const OTHER_VIDEOS = {
  'whelm-preview': 'whelm-preview_jcs1jq',
}

// ── Whelm ──
export const WHELM_IMAGES = {
  'whelm-2': '2',
  'whelm-3': '3',
  'whelm-4': '4',
}

export const WHELM_VIDEOS = {
  'whelm-opener':  '1-opener',
  'whelm-meter':   '2-meter',
  'whelm-body':    '3-body',
  'whelm-breathe': '4-Breathe',
}
