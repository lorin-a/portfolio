import styles from '../whelm.module.css'

/* Cursive whelm — centerline path traced through the writing direction.
   The raw export from Figma is a polyline (straight segments between
   click-points). We smooth it at module load via centripetal
   Catmull-Rom interpolation, converting each straight segment into a
   cubic bezier that flows smoothly through the points. The result
   reads as hand-drawn curves rather than connected line segments.

   Stroked with a 3-stop gradient at 22px (matches the original brush
   width). Round caps and joins give the ends a slight tapered feel
   without true variable-width stroke (which SVG doesn't support
   natively). The orchestrator animates stroke-dashoffset along the
   path's drawing direction for true point-to-point handwriting. */

const RAW_POLYLINE =
  'M253.5 144L237 157.5L207 185L174 223.5L146 265.5L128.5 296.5L120 323.5L110.5 359.5L104 381.5L106.5 397L120 403H143H165.5L191 405.5L221 403L263.5 388.5L306 367.5L355 337.5L396 305.5L439 265.5L467 226.5L486 198.5L500.5 166.5V157.5L494.5 150.5H482.5L467 154.5L435.5 173L396 205.5L361.5 238.5L324 272.5L290 302.5L257 330.5L230 353L196.5 385L155.5 438L143 466L132.5 495L128.5 523.5L136 550L150.5 566L179.5 576.5L207 582.5L249 579.5L283.5 571.5L324 560L373 541.5L449 513L544.5 469.5L620 426L691 371L727.5 333L778.5 272.5L807.5 229L811.5 205.5L801 185L784 173L761 178L725.5 203.5L672 244L607.5 291.5L550.5 347.5L489.5 405.5L439 457.5L386.5 513L323 584.5L266 665L238.5 710L228 747.5L221 793.5L218.5 833.5L228 860.5L246.5 881.5L274 906.5L311.5 914H359.5L386.5 909L443.5 881.5L553.5 817.5L762 688L862.5 612L908 571.5L934 537.5L939.5 518L934 505L918 508.5L848.5 554L794.5 588L700 655.5L640 712.5L593.5 766.5L561 804.5L503 874.5L476.5 914L467 936.5V961L482.5 982L507.5 995L540 1005H606.5H657.5L686 995L724 968.5L749.5 947L777 932.5H802L829 936.5L856 947L862.5 974.5L866 1013V1046L879.5 1069L908 1086.5L940 1095L987 1090.5L1027.5 1078L1074.5 1043.5L1106.5 1013L1135.5 974.5L1148.5 939L1151.5 899L1148.5 889.5H1135.5L1111 904L1080.5 942L1052.5 986L1027.5 1032.5L1024.5 1056.5L1027.5 1103.5L1034.5 1122.5L1052.5 1140.5L1078 1153.5L1140 1166.5L1211 1172.5H1265.5L1307 1164L1358.5 1140.5L1412.5 1110.5L1466.5 1075.5L1561 1007.5L1694.5 885.5L1774.5 803L1803.5 765L1825 734L1844.5 689.5L1854.5 633V588.5V544L1844.5 518L1830 514.5L1806.5 528L1779.5 551.5L1750 588.5L1710 650.5L1662.5 726L1598 861L1567 925L1543.5 981L1529 1019.5L1519.5 1075.5L1522.5 1121L1529 1149L1547.5 1166.5L1570.5 1184L1602 1191.5H1627.5L1658 1184L1687.5 1172.5L1710 1146L1740.5 1101L1763 1063L1791 1032.5L1815.5 1023H1833.5L1849.5 1035.5L1861.5 1057L1868 1092L1870.5 1134.5L1868 1180L1858.5 1198L1849.5 1216L1844.5 1209.5L1846.5 1191L1858.5 1153L1865.5 1132L1884.5 1101L1911 1086.5L1934 1079L1960.5 1081.5L1979.5 1092L2000.5 1115.5L2014 1140.5L2025 1166.5L2033 1200.5L2039.5 1228.5L2048.5 1254.5L2057.5 1276L2071 1297.5L2087 1308.5L2101 1316L2120 1325'

/* Parse a Figma-exported polyline (M / L / H / V commands only) into
   a flat list of points. Handles uppercase absolute commands which is
   what Figma emits for stroked paths. */
function parsePolyline(d) {
  const points = []
  let lastX = 0
  let lastY = 0
  const re = /([MLHV])\s*((?:-?\d+(?:\.\d+)?[\s,]*)+)/g
  let match
  while ((match = re.exec(d)) !== null) {
    const cmd = match[1]
    const nums = match[2].trim().split(/[\s,]+/).map(Number)
    if (cmd === 'M' || cmd === 'L') {
      for (let i = 0; i + 1 < nums.length; i += 2) {
        lastX = nums[i]
        lastY = nums[i + 1]
        points.push({ x: lastX, y: lastY })
      }
    } else if (cmd === 'H') {
      for (const n of nums) {
        lastX = n
        points.push({ x: lastX, y: lastY })
      }
    } else if (cmd === 'V') {
      for (const n of nums) {
        lastY = n
        points.push({ x: lastX, y: lastY })
      }
    }
  }
  return points
}

/* Centripetal Catmull-Rom smoothing — converts a polyline into a
   sequence of cubic beziers that flow smoothly through every original
   point. Centripetal (alpha=0.5) avoids the loops/overshoots that
   uniform Catmull-Rom produces on tight angles. */
function smoothPolyline(points, alpha = 0.5) {
  if (points.length < 2) return ''
  let d = `M${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]
    const d1 = Math.pow((p1.x - p0.x) ** 2 + (p1.y - p0.y) ** 2, alpha / 2)
    const d2 = Math.pow((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2, alpha / 2)
    const d3 = Math.pow((p3.x - p2.x) ** 2 + (p3.y - p2.y) ** 2, alpha / 2)
    /* Tangent vectors at p1 and p2 (centripetal Catmull-Rom). */
    let c1x, c1y, c2x, c2y
    if (d1 < 1e-6) {
      c1x = p1.x
      c1y = p1.y
    } else {
      const denom = 3 * d1 * (d1 + d2)
      c1x = p1.x + (d1 * d1 * (p2.x - p0.x)) / denom
      c1y = p1.y + (d1 * d1 * (p2.y - p0.y)) / denom
    }
    if (d3 < 1e-6) {
      c2x = p2.x
      c2y = p2.y
    } else {
      const denom = 3 * d3 * (d3 + d2)
      c2x = p2.x - (d3 * d3 * (p3.x - p1.x)) / denom
      c2y = p2.y - (d3 * d3 * (p3.y - p1.y)) / denom
    }
    d += ` C${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
  }
  return d
}

const SMOOTHED_PATH_D = smoothPolyline(parsePolyline(RAW_POLYLINE))

export default function CursiveWhelm() {
  return (
    <svg
      viewBox="0 0 2224 1395"
      className={styles.cursiveSvg}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="cursive-stroke"
          x1="0"
          y1="0"
          x2="2224"
          y2="1395"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#4d1c7a" />
          <stop offset="0.4" stopColor="#8552B2" />
          <stop offset="0.85" stopColor="#BDB7E9" />
        </linearGradient>
        <filter id="cursive-soft" x="-2%" y="-2%" width="104%" height="104%">
          <feGaussianBlur stdDev="0.6" />
        </filter>
      </defs>
      <path
        data-cursive-path="true"
        d={SMOOTHED_PATH_D}
        fill="none"
        stroke="url(#cursive-stroke)"
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#cursive-soft)"
        pathLength="1000"
        strokeDasharray="1000"
        strokeDashoffset="1000"
      />
    </svg>
  )
}
