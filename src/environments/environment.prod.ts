// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  //serviceURL: 'https://9o883uvesg.execute-api.ca-central-1.amazonaws.com/test2'
  //serviceURL: 'https://78lyhxxns5.execute-api.ca-central-1.amazonaws.com/test1'
  oldordersLookupURI: 'https://0foeonhu7h.execute-api.ca-central-1.amazonaws.com/test1',
  serviceURL: 'https://c9xo12ws2e.execute-api.ca-central-1.amazonaws.com/test1',
  gtinLookupURI: 'https://67cjybkj26.execute-api.ca-central-1.amazonaws.com/test1',
  hbicLookupURI: 'https://fzneod5n66.execute-api.ca-central-1.amazonaws.com/test1',
  // PROD
  //saveURI: 'https://4i3g3yvhsd.execute-api.ca-central-1.amazonaws.com/test1',
  // TEST
  saveURI: 'https://372pm5nka4.execute-api.ca-central-1.amazonaws.com/test1',
  getTraynamesURI: 'https://5x76q236b1.execute-api.ca-central-1.amazonaws.com/test1',
  vcLookupURI: 'https://cvodterc3b.execute-api.ca-central-1.amazonaws.com/test1',
  saveMissingURI: 'https://2q9b3xwubf.execute-api.ca-central-1.amazonaws.com/test1',
  getTrayMissingItemsTwoWeeksURI: 'https://l7j7vipf74.execute-api.ca-central-1.amazonaws.com/test1',
  saveReplacedURI: 'https://hnyw75l5ai.execute-api.ca-central-1.amazonaws.com/test1'

};
