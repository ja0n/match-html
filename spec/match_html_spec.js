var matchHTML = require('../debug');

it("doesn't care for line breaks", function() {
  const expected = "<!DOCTYPE html>\n";
  const given = '<!DOCTYPE html>';

  expect(matchHTML(expected, given)).toEqual(true);
});

it("knows how to handle comments", function() {
  const expected = "<!DOCTYPE html>\n<!-- Isso é um comentário -->";
  const given = "<!DOCTYPE html>\n<!-- Isso é um comentário -->";

  expect(matchHTML(expected, given)).toEqual(true);
});

it("knows how to handle empty inputs", function() {
  const expected = "<!DOCTYPE html>\n";

  expect(matchHTML(expected, undefined)).toEqual(false);
  expect(matchHTML(expected, null)).toEqual(false);
  expect(matchHTML(expected, '')).toEqual(false);
});
