git pull origin dev
npm install
npm run build
git add --all
git commit -m 'fake commit'
npm version prerelease --preid=alpha
npm publish --tag beta
git push origin dev


