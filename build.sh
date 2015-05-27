cat ~/ascii/building
echo -e '\n'
cat ~/ascii/eConnection
echo -e '\n\n'
grunt build:distribution;
premailer --base-url "https://www.dfwworld.org" --css tmp/css/tidy.css dist/index.html > dist/$(date +%Y%m%d).html;
csscomb --verbose tmp/css/tidy.css;
cat tmp/css/tidy.css | pbcopy;
vim dist/$(date +%Y%m%d).html;
cat dist/$(date +%Y%m%d).html | pbcopy;
chrome-cli open 'https://www.dfwworld.org/cms/emailgallery';
