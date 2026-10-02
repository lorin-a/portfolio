/* Bridging the G.A.P. — the studio work, for the folder sheet (FS300).
   Named by what each shows; public IDs as uploaded to
   portfolio/Bridging-the-Gap/images. The deck slides are 16:9; the
   GAP_Pamphlet photographs are 3:2 (some portrait).

   Videos already live in HOME_VIDEOS (lib/cloudinary.js) and the sheet
   uses those keys: bridging-default (Logos_1), bridging-gap-logo,
   bridging-logos-2, bridging-logos-3, bridging-app-iphone,
   bridging-clip-1, bridging-clip-2. Early_App_Prototype_GIF is a .mov
   and is left out (it would need an mp4 delivery to play everywhere).
   BTG_23, BTG_24 and BTG_25 render as blank navy slides and are skipped. */

export const BG_IMAGES = {
  // the deck: research + synthesis
  'bg-what-is-gap':      'BTG_4',    // riders on a trail bridge, with “What is the GAP?”
  'bg-team-outdoors':    'BTG_6',    // the team's own photos outdoors
  'bg-what-would-help':  'BTG_8',    // trail photos beside “What would get you to go bike touring?”
  'bg-problem':          'BTG_10',   // the problem and the opportunity, side by side
  'bg-personas':         'BTG_14',   // three personas, Jane Lee first
  'bg-journey':          'BTG_15',   // journey maps across planning, riding, and after
  'bg-pain-points':      'BTG_16',   // pain points: awareness, logistics, knowledge
  'bg-deliverables':     'BTG_17',   // pain points mapped to the four deliverables
  'bg-market':           'BTG_18',   // pros of AllTrails, Strava, and Gaia GPS
  'bg-moodboard':        'BTG_20',   // mood board of trail brands, signage, and maps
  // the brand
  'bg-g-mark':           'BTG_1',    // the G mark on navy
  'bg-gap-vertical':     'BTG_22',   // G A P stacked, each letter an arrow
  'bg-btg-logo-color':   'BTG_26',   // Bridging the GAP logo, river and road lettering
  'bg-btg-logo':         'BTG_27',   // Bridging the GAP wordmark, the river wave through it
  'bg-gap-wordmark':     'BTG_28',   // Great Allegheny Passage wordmark
  'bg-style-guide':      'BTG_29',   // logos, merch, colors, fonts, graphics
  'bg-graphics':         'BTG_30',   // the icon and attraction-badge set
  // apparel
  'bg-apparel':          'BTG_32',   // tote, caps, tee, socks
  'bg-apparel-bottles':  'BTG_33',   // tote, bottles, tees, a bottle held at the river
  // the guide
  'bg-guide-in-use':     'BTG_35',   // the guide in a back pocket by a bike; both sides laid out
  'bg-guide-collage':    'BTG_36',   // the guide in hand and in a pocket, four photos
  'bg-guide-contents':   'BTG_37',   // the guide unfolded, with its contents listed
  'bg-guide-mockup':     'FINAL_BROCHURE_GRAY', // both sides of the guide, flat mockup
  'bg-guide-route':      'GAP_Pamphlet-03',     // route side unfolded on dark ground
  'bg-guide-gear':       'GAP_Pamphlet-02',     // gear guide and itinerary side, unfolded
  'bg-guide-standing':   'GAP_Pamphlet-01',     // folded guides standing on a ledge
  'bg-guide-held':       'GAP_Pamphlet-14',     // the folded guide held up outdoors
  'bg-guide-pocket':     'GAP_Pamphlet-16',     // the guide in a cyclist's pocket by a red bike
  'bg-guide-back':       'GAP_Pamphlet-21',     // the guide in a back pocket, bike at hand
  'bg-guide-reading':    'GAP_Pamphlet-25',     // a rider holding the guide open, gear side
  'bg-guide-handlebars': 'GAP_Pamphlet-27',     // reading the route side over the handlebars
  'bg-guide-grass':      'GAP_Pamphlet-08',     // route side unfolded on grass
  // signage
  'bg-signage':          'BTG_39',   // a branded trail sign and painted mileage line on a park path
  'bg-mural':            'BTG_40',   // asphalt mural mockups: mileage to campground, waterfall, tunnel
  // the app
  'bg-app-intro':        'BTG_41',   // the GAP Map App icon over a map
  'bg-app-style':        'BTG_44',   // app colors, fonts, components
  'bg-app-ia':           'BTG_45',   // information architecture and user flow
  'bg-app-wireframes':   'BTG_46',   // lo-fi wireframes
  'bg-app-planner':      'BTG_47',   // trip planner, route detail, supportive messages
  'bg-app-ride':         'BTG_48',   // riding: data tracking, audio tour, alerts
  'bg-app-selfies':      'BTG_49',   // in-app selfies along the trail
  'bg-app-recap':        'BTG_50',   // the trip recap: attractions, photos, miles toward merch
  /* FS303: uploaded 2026-10-02 from her local folder (NEW 2026 Portfolio
     Files Cloudinary/Bridging the Gap) and, for the process images, from
     her Medium article. Public ID = key. */
  // field research at Ohiopyle and Smithton (her phone photos)
  'bg-field-board':        'bg-field-board',        // “What would get you to go bike touring?” board beside a loaded touring bike
  'bg-field-bridge':       'bg-field-bridge',       // two riders crossing the trail bridge over the river
  'bg-field-team':         'bg-field-team',         // Lorin, Michael, and Rui, a selfie at the Ohiopyle falls
  'bg-field-town-map':     'bg-field-town-map',     // the existing Smithton town map and directory sign
  'bg-field-mile-post':    'bg-field-mile-post',    // the existing mileage post at Smithton
  'bg-field-local-board':  'bg-field-local-board',  // a “Support Local Business” bulletin board in a trail town
  // the app shoot (files named Zo_Lorin_Anderberg)
  'bg-app-shoot-maps':     'bg-app-shoot-maps',     // planning at a window table spread with paper trail maps
  'bg-app-shoot-planning': 'bg-app-shoot-planning', // overhead: maps, a laptop, and the app on a phone
  'bg-app-shoot-phone':    'bg-app-shoot-phone',    // overhead: the app held over the maps
  // the guide, panel by panel (flat artwork)
  'bg-guide-panel-cover':  'bg-guide-panel-cover',  // cover: “Discover the Joy of Bike Touring the Great Allegheny Passage!”
  'bg-guide-panel-gear':   'bg-guide-panel-gear',   // the illustrated gear guide
  'bg-guide-panel-faq':    'bg-guide-panel-faq',    // FAQ panel
  'bg-guide-panel-2days':  'bg-guide-panel-2days',  // a two-day itinerary, Connellsville to Cumberland
  'bg-guide-panel-route':  'bg-guide-panel-route',  // a stretch of the route map with its attractions
  'bg-guide-panel-know':   'bg-guide-panel-know',   // “Know Before You Go”
  // signage and trail art mockups
  'bg-trail-art-park':     'bg-trail-art-park',     // a branded sign and painted mileage line on a park path
  'bg-trail-art-forest':   'bg-trail-art-forest',   // painted mileage lines and the GAP star on a forest road
  // apparel, single mockups
  'bg-merch-tote':         'bg-merch-tote',         // the Bridging the GAP tote on blue
  'bg-merch-cap':          'bg-merch-cap',          // a blue Great Allegheny Passage cap
  'bg-merch-socks':        'bg-merch-socks',        // GAP socks with the road-line pattern
  'bg-merch-bottle-lake':  'bg-merch-bottle-lake',  // a GAP sport bottle held up over the water
  // process, from her Medium article (captions hers)
  'bg-logo-iterations':    'bg-logo-iterations',    // “Early iterations of the logo”: the bike-letter GAP
  'bg-sticker-badges':     'bg-sticker-badges',     // her first sticker badges of trail attractions
  'bg-app-sketches':       'bg-app-sketches',       // “Early sketches of web/app UX”: an elevation route sketch
  'bg-guide-layout':       'bg-guide-layout',       // “Exploring the layout”: whiteboard sketches of the guide
}
