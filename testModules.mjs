const urls = [
  'http://localhost:5174/src/main.jsx',
  'http://localhost:5174/src/App.jsx',
  'http://localhost:5174/src/components/TailoredSolutionsMatrix.jsx',
  'http://localhost:5174/src/data/tailoredSolutionsData.json'
];

for (const url of urls) {
  const res = await fetch(url);
  console.log(`URL: ${url} => Status: ${res.status}`);
  if (res.status !== 200) {
    const text = await res.text();
    console.error('Error content:', text.slice(0, 300));
  }
}
