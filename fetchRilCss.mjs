import fs from 'fs';

async function run() {
  try {
    const res = await fetch('https://www.ril.com/');
    const html = await res.text();
    const cssMatches = html.match(/\/sites\/default\/files\/css\/[^"]+/g) || [];
    console.log('CSS matches:', cssMatches);
    for (let i = 0; i < Math.min(2, cssMatches.length); i++) {
      const cssRes = await fetch('https://www.ril.com' + cssMatches[i]);
      const css = await cssRes.text();
      fs.writeFileSync(`ril_style_${i}.css`, css);
      console.log(`Saved ril_style_${i}.css, size: ${css.length}`);

      // Search for video-content and buttons
      const match = css.match(/\.video-content[^{]*\{[^}]*\}/gi);
      console.log('video-content rules:', match);

      const btnMatch = css.match(/\.video-content\s+ul[^{]*\{[^}]*\}/gi);
      console.log('video-content ul rules:', btnMatch);

      const btnLinkMatch = css.match(/\.video-content\s+ul\s+li[^{]*\{[^}]*\}/gi);
      console.log('video-content ul li rules:', btnLinkMatch);
    }
  } catch (err) {
    console.error(err);
  }
}

run();
